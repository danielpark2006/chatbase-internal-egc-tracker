export default function OrdinalStatCards({ profiles, posts }) {
  const totalImpressions = profiles.reduce((s, p) => s + (p.total_impressions || 0), 0);
  const totalPosts = profiles.reduce((s, p) => s + (p.total_posts || 0), 0);
  const avgEngRate = profiles.length > 0
    ? profiles.reduce((s, p) => s + (p.avg_engagement_rate || 0), 0) / profiles.length
    : 0;
  const totalFollowers = profiles.reduce((s, p) => s + (p.follower_count || 0), 0);
  const totalLikes = posts.reduce((s, p) => s + (p.likes || 0), 0);

  const cards = [
    { label: "Total Impressions", value: totalImpressions.toLocaleString(), color: "#60a5fa" },
    { label: "Total Posts", value: totalPosts, color: "#f9a8d4" },
    { label: "Avg Eng Rate", value: `${avgEngRate.toFixed(2)}%`, color: "#34d399" },
    { label: "Total Followers", value: totalFollowers.toLocaleString(), color: "#a78bfa" },
    { label: "Total Likes", value: totalLikes.toLocaleString(), color: "#f59e0b" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 24 }}>
      {cards.map(c => (
        <div key={c.label} style={{ background: "#141414", border: "1px solid #262626", borderRadius: 12, padding: "16px 20px" }}>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>{c.label}</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: c.color }}>{c.value}</div>
        </div>
      ))}
    </div>
  );
}