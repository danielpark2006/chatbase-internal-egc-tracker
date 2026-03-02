function getRange(period, offset = 0) {
  const now = new Date();
  const days = period === "week" ? 7 : period === "month" ? 30 : 365;
  const end = new Date(now);
  end.setDate(now.getDate() - days * offset);
  end.setHours(23, 59, 59, 999);
  const start = new Date(end);
  start.setDate(end.getDate() - (days - 1));
  start.setHours(0, 0, 0, 0);
  return { start, end };
}

function filterPosts(posts, start, end) {
  return posts.filter(p => {
    if (!p.post_date) return false;
    const d = new Date(p.post_date + "T00:00:00");
    return d >= start && d <= end;
  });
}

export default function PeriodStatCards({ profiles, posts, period }) {
  const { start, end } = getRange(period, 0);
  const { start: ps, end: pe } = getRange(period, 1);

  const curr = filterPosts(posts, start, end);
  const prev = filterPosts(posts, ps, pe);

  const totalImpressions = curr.reduce((s, p) => s + (p.impressions || 0), 0);
  const prevImpressions = prev.reduce((s, p) => s + (p.impressions || 0), 0);
  const totalPosts = curr.length;
  const prevPosts = prev.length;
  const totalLikes = curr.reduce((s, p) => s + (p.likes || 0), 0);
  const totalComments = curr.reduce((s, p) => s + (p.comments || 0), 0);
  const totalEngagement = curr.reduce((s, p) => s + (p.likes || 0) + (p.comments || 0) + (p.shares || 0) + (p.clicks || 0), 0);
  const avgEngRate = totalImpressions > 0 ? ((totalEngagement / totalImpressions) * 100).toFixed(2) : "0.00";

  const impressionChange = prevImpressions > 0 ? (((totalImpressions - prevImpressions) / prevImpressions) * 100).toFixed(0) : null;
  const postsChange = prevPosts > 0 ? (((totalPosts - prevPosts) / prevPosts) * 100).toFixed(0) : null;
  const label = period === "week" ? "vs prev 7 days" : period === "month" ? "vs prev 30 days" : "vs prev 365 days";

  const cards = [
    { label: "Impressions", value: totalImpressions.toLocaleString(), color: "#60a5fa", change: impressionChange, label2: label },
    { label: "Posts Published", value: totalPosts, color: "#f9a8d4", change: postsChange, label2: label },
    { label: "Avg Eng Rate", value: `${avgEngRate}%`, color: "#34d399", change: null },
    { label: "Likes", value: totalLikes.toLocaleString(), color: "#f59e0b", change: null },
    { label: "Comments", value: totalComments.toLocaleString(), color: "#a78bfa", change: null },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 24 }}>
      {cards.map(c => (
        <div key={c.label} style={{ background: "#141414", border: "1px solid #262626", borderRadius: 12, padding: "16px 20px" }}>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>{c.label}</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: c.color }}>{c.value}</div>
          {c.change !== null && (
            <div style={{ fontSize: 11, marginTop: 4, color: Number(c.change) >= 0 ? "#34d399" : "#f87171" }}>
              {Number(c.change) >= 0 ? "▲" : "▼"} {Math.abs(c.change)}% {c.label2}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}