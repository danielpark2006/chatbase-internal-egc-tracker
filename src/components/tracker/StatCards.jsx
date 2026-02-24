export default function StatCards({ stats }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 24 }}>
      {[
        ["Posts", stats.totalPosts, "#2563eb"],
        ["Reactions", stats.totalReactions.toLocaleString(), "#8b5cf6"],
        ["Comments", stats.totalComments.toLocaleString(), "#06b6d4"],
        ["Reposts", stats.totalReposts.toLocaleString(), "#f59e0b"],
        ["Avg Eng.", stats.avgEng.toLocaleString(), "#10b981"],
      ].map(([l, v, c]) => (
        <div key={l} style={{ background: "#141414", border: "1px solid #262626", borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 11, color: "#888", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{l}</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: c }}>{v}</div>
        </div>
      ))}
    </div>
  );
}