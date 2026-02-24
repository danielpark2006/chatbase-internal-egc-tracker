const QUOTA = 3;

export default function DashboardView({ stats, team }) {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
        <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 4 }}>WoW Growth</div>
          {stats.wowGrowth !== null ? (
            <div style={{ fontSize: 40, fontWeight: 700, color: stats.wowGrowth >= 0 ? "#10b981" : "#ef4444" }}>
              {stats.wowGrowth >= 0 ? "+" : ""}{stats.wowGrowth}%
            </div>
          ) : <div style={{ fontSize: 20, color: "#888" }}>Need 2+ weeks of data</div>}
          <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>total engagement vs last week</div>
        </div>

        <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 8 }}>Top Post</div>
          {stats.topPost ? (
            <>
              <div style={{ fontSize: 15, color: "#fff", fontWeight: 500, marginBottom: 4 }}>{stats.topPost.title}</div>
              <div style={{ fontSize: 13, color: "#888", marginBottom: 10 }}>by {stats.topPost.author} on {stats.topPost.date}</div>
              <div style={{ display: "flex", gap: 12 }}>
                <span style={{ color: "#8b5cf6", fontWeight: 700 }}>{stats.topPost.reactions.toLocaleString()} <span style={{ color: "#888", fontWeight: 400, fontSize: 12 }}>reacts</span></span>
                <span style={{ color: "#06b6d4", fontWeight: 700 }}>{stats.topPost.comments.toLocaleString()} <span style={{ color: "#888", fontWeight: 400, fontSize: 12 }}>comments</span></span>
                <span style={{ color: "#f59e0b", fontWeight: 700 }}>{stats.topPost.reposts.toLocaleString()} <span style={{ color: "#888", fontWeight: 400, fontSize: 12 }}>reposts</span></span>
              </div>
            </>
          ) : <div style={{ color: "#888" }}>No posts yet</div>}
        </div>
      </div>

      <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 4 }}>This Week's Quota ({QUOTA} posts/person)</div>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 16 }}>{stats.active}/{team.length} people have posted all-time</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
          {team.map(m => {
            const name = typeof m === "string" ? m : m.name;
            const count = stats.currentQuota[name] || 0;
            const met = count >= QUOTA;
            return (
              <div key={name} style={{ background: "#1a1a1a", borderRadius: 8, padding: "12px 10px", textAlign: "center", border: `1px solid ${met ? "#166534" : count > 0 ? "#92400e" : "#262626"}` }}>
                <div style={{ fontSize: 12, color: "#ccc", marginBottom: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: met ? "#4ade80" : count > 0 ? "#f59e0b" : "#ef4444" }}>{count}/{QUOTA}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}