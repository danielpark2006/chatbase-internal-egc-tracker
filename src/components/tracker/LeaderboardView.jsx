export default function LeaderboardView({ authorStats }) {
  const maxEng = Math.max(...authorStats.map(a => a.engagement), 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {authorStats.map((a, i) => (
        <div key={a.name} style={{ background: "#141414", border: "1px solid #262626", borderRadius: 12, padding: "14px 20px", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: i === 0 ? "#f59e0b" : i === 1 ? "#94a3b8" : i === 2 ? "#cd7c2f" : "#555", width: 28, textAlign: "center" }}>
            {i + 1}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontWeight: 600, color: "#fff", fontSize: 15 }}>{a.name}</span>
              <div style={{ display: "flex", gap: 14, fontSize: 12 }}>
                <span style={{ color: "#888" }}>{a.posts} posts</span>
                <span style={{ color: "#8b5cf6" }}>{a.reactions.toLocaleString()} reacts</span>
                <span style={{ color: "#06b6d4" }}>{a.comments.toLocaleString()} comments</span>
                <span style={{ color: "#f59e0b" }}>{a.reposts.toLocaleString()} reposts</span>
                <span style={{ color: "#10b981", fontWeight: 700 }}>{a.engagement.toLocaleString()}</span>
              </div>
            </div>
            <div style={{ height: 6, background: "#262626", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(a.engagement / maxEng) * 100}%`, background: "linear-gradient(90deg, #2563eb, #8b5cf6)", borderRadius: 3, transition: "width 0.6s ease" }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}