const WEEKLY_QUOTA = 3;

function formatDateRange(start, end) {
  const opts = { month: "short", day: "numeric" };
  return `${start.toLocaleDateString("en-US", opts)} – ${end.toLocaleDateString("en-US", opts)}`;
}

function getCurrentWeekRange() {
  const now = new Date();
  const day = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((day + 6) % 7));
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return { start: monday, end: sunday };
}

function getWeekRanges(period) {
  const weeks = [];
  const { start: thisStart, end: thisEnd } = getCurrentWeekRange();
  const count = period === "week" ? 1 : period === "month" ? 4 : 12;
  for (let i = 0; i < count; i++) {
    const s = new Date(thisStart);
    s.setDate(thisStart.getDate() - i * 7);
    const e = new Date(thisEnd);
    e.setDate(thisEnd.getDate() - i * 7);
    weeks.push({ start: s, end: e });
  }
  return weeks;
}

function countPosts(posts, profileOrdinalId, start, end) {
  return posts.filter(p => {
    if (p.profile_id !== profileOrdinalId) return false;
    const d = new Date(p.post_date + "T00:00:00");
    return d >= start && d <= end;
  }).length;
}

export default function QuotaTracker({ profiles, posts, period }) {
  const weeks = getWeekRanges(period);
  const people = profiles.filter(p => p.role !== "Company Page");

  if (period === "week") {
    const { start, end } = weeks[0];
    const rows = people.map(profile => {
      const count = countPosts(posts, profile.ordinal_id, start, end);
      const pct = Math.min((count / WEEKLY_QUOTA) * 100, 100);
      const met = count >= WEEKLY_QUOTA;
      const close = !met && count >= WEEKLY_QUOTA - 1;
      return { profile, count, pct, met, close };
    }).sort((a, b) => b.count - a.count);

    const metCount = rows.filter(r => r.met).length;

    return (
      <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>
            📊 Weekly Posting Quota
            <span style={{ fontSize: 12, color: "#888", fontWeight: 400, marginLeft: 8 }}>
              {WEEKLY_QUOTA} posts/week · {formatDateRange(start, end)}
            </span>
          </div>
          <div style={{ fontSize: 13, color: "#888" }}>
            <span style={{ color: "#34d399", fontWeight: 700 }}>{metCount}</span>/{rows.length} on track
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {rows.map(({ profile, count, pct, met, close }) => (
            <div key={profile.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 130, fontSize: 13, color: "#ccc", fontWeight: 500, flexShrink: 0 }}>{profile.name}</div>
              <div style={{ flex: 1, height: 8, background: "#262626", borderRadius: 4, overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: `${pct}%`,
                  background: met ? "#34d399" : close ? "#f59e0b" : "#2563eb",
                  borderRadius: 4, transition: "width 0.5s ease"
                }} />
              </div>
              <div style={{ width: 60, fontSize: 12, textAlign: "right", flexShrink: 0 }}>
                <span style={{ color: met ? "#34d399" : close ? "#f59e0b" : "#888", fontWeight: 700 }}>{count}</span>
                <span style={{ color: "#444" }}>/{WEEKLY_QUOTA}</span>
                {met && <span style={{ marginLeft: 4 }}>✓</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 12, padding: 20, marginBottom: 24, overflowX: "auto" }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 16 }}>
        📊 Weekly Posting Quota
        <span style={{ fontSize: 12, color: "#888", fontWeight: 400, marginLeft: 8 }}>{WEEKLY_QUOTA} posts/week target</span>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", color: "#888", fontWeight: 500, padding: "6px 10px" }}>Person</th>
            {weeks.map((w, i) => (
              <th key={i} style={{ textAlign: "center", color: "#888", fontWeight: 500, padding: "6px 8px", whiteSpace: "nowrap" }}>
                {formatDateRange(w.start, w.end)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {people.map(profile => (
            <tr key={profile.id} style={{ borderTop: "1px solid #1f1f1f" }}>
              <td style={{ padding: "8px 10px", color: "#ccc", fontWeight: 500 }}>{profile.name}</td>
              {weeks.map((w, i) => {
                const count = countPosts(posts, profile.ordinal_id, w.start, w.end);
                const met = count >= WEEKLY_QUOTA;
                const close = !met && count >= WEEKLY_QUOTA - 1;
                return (
                  <td key={i} style={{ textAlign: "center", padding: "8px 8px" }}>
                    <span style={{
                      display: "inline-block", minWidth: 28, padding: "2px 6px", borderRadius: 6,
                      fontWeight: 700, fontSize: 13,
                      background: met ? "#14532d" : close ? "#451a03" : "#1a1a1a",
                      color: met ? "#34d399" : close ? "#f59e0b" : "#555"
                    }}>
                      {count}/{WEEKLY_QUOTA}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}