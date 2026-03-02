import { formatDateRange } from "./dateRanges";

const WEEKLY_QUOTA = 3;

// Get current Mon-Sun week containing today
function getCurrentWeekRange() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon...
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((day + 6) % 7));
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return { start: monday, end: sunday };
}

// Build list of week ranges covering the last N days, most recent first
function getWeekRanges(period) {
  const weeks = [];
  const { start: thisStart, end: thisEnd } = getCurrentWeekRange();

  if (period === "week") {
    weeks.push({ start: thisStart, end: thisEnd });
  } else if (period === "month") {
    // Last 4 weeks
    for (let i = 0; i < 4; i++) {
      const s = new Date(thisStart);
      s.setDate(thisStart.getDate() - i * 7);
      const e = new Date(thisEnd);
      e.setDate(thisEnd.getDate() - i * 7);
      weeks.push({ start: s, end: e });
    }
  } else {
    // Last 12 weeks for year view
    for (let i = 0; i < 12; i++) {
      const s = new Date(thisStart);
      s.setDate(thisStart.getDate() - i * 7);
      const e = new Date(thisEnd);
      e.setDate(thisEnd.getDate() - i * 7);
      weeks.push({ start: s, end: e });
    }
  }
  return weeks;
}

export default function QuotaTracker({ profiles, posts, period }) {
  const weeks = getWeekRanges(period);
  const people = profiles.filter(p => p.role !== "Company Page");

  // For single week view: show progress bars per person
  if (period === "week") {
    const { start, end } = weeks[0];
    const rows = people.map(profile => {
      const count = posts.filter(p => {
        if (p.profile_id !== profile.ordinal_id) return false;
        const d = new Date(p.post_date + "T00:00:00");
        return d >= start && d <= end;
      }).length;
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

  // For month/year view: show a table of weekly quota by person
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
                const count = posts.filter(p => {
                  if (p.profile_id !== profile.ordinal_id) return false;
                  const d = new Date(p.post_date + "T00:00:00");
                  return d >= w.start && d <= w.end;
                }).length;
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