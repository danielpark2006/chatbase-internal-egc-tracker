const QUOTA = 3; // posts per week

function getDateRange(period) {
  const now = new Date();
  if (period === "week") {
    const day = now.getDay(); // 0=Sun
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((day + 6) % 7));
    monday.setHours(0, 0, 0, 0);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);
    return { start: monday, end: sunday };
  }
  if (period === "month") {
    return {
      start: new Date(now.getFullYear(), now.getMonth(), 1),
      end: new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)
    };
  }
  return {
    start: new Date(now.getFullYear(), 0, 1),
    end: new Date(now.getFullYear(), 11, 31, 23, 59, 59)
  };
}

function getQuota(period) {
  if (period === "week") return 3;
  if (period === "month") return 12; // ~3/week × 4
  return 144; // ~3/week × 48
}

export default function QuotaTracker({ profiles, posts, period }) {
  const { start, end } = getDateRange(period);
  const quota = getQuota(period);

  // Count posts per profile within the period (exclude company page)
  const people = profiles.filter(p => p.role !== "Company Page");

  const rows = people.map(profile => {
    const count = posts.filter(p => {
      if (p.profile_id !== profile.ordinal_id) return false;
      const d = new Date(p.post_date + "T00:00:00");
      return d >= start && d <= end;
    }).length;
    const pct = Math.min((count / quota) * 100, 100);
    const met = count >= quota;
    const close = !met && count >= quota - 1;
    return { profile, count, pct, met, close };
  }).sort((a, b) => b.count - a.count);

  const metCount = rows.filter(r => r.met).length;

  return (
    <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 12, padding: 20, marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>
          📊 Posting Quota
          <span style={{ fontSize: 12, color: "#888", fontWeight: 400, marginLeft: 8 }}>
            {quota} posts {period === "week" ? "/ week" : period === "month" ? "/ month" : "/ year"} target
          </span>
        </div>
        <div style={{ fontSize: 13, color: "#888" }}>
          <span style={{ color: "#34d399", fontWeight: 700 }}>{metCount}</span>/{rows.length} on track
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {rows.map(({ profile, count, pct, met, close }) => (
          <div key={profile.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 130, fontSize: 13, color: "#ccc", fontWeight: 500, flexShrink: 0 }}>
              {profile.name}
            </div>
            <div style={{ flex: 1, height: 8, background: "#262626", borderRadius: 4, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${pct}%`,
                background: met ? "#34d399" : close ? "#f59e0b" : "#2563eb",
                borderRadius: 4,
                transition: "width 0.5s ease"
              }} />
            </div>
            <div style={{ width: 60, fontSize: 12, textAlign: "right", flexShrink: 0 }}>
              <span style={{ color: met ? "#34d399" : close ? "#f59e0b" : "#888", fontWeight: 700 }}>{count}</span>
              <span style={{ color: "#444" }}>/{quota}</span>
              {met && <span style={{ marginLeft: 4 }}>✓</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}