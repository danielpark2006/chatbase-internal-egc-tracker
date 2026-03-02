import { getDateRange, getPrevDateRange, filterPostsByRange } from "./dateRanges.js";

export default function PeriodStatCards({ profiles, posts, period }) {
  const { start, end } = getDateRange(period);
  const { start: ps, end: pe } = getPrevDateRange(period);

  const curr = filterPostsByRange(posts, start, end);
  const prev = filterPostsByRange(posts, ps, pe);

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