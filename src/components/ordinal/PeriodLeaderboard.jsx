import { getDateRange, filterPostsByRange } from "./dateRanges.js";

export default function PeriodLeaderboard({ profiles, posts, period }) {
  const { start, end } = getDateRange(period);
  const periodPosts = filterPostsByRange(posts, start, end);

  const stats = profiles.map(profile => {
    const myPosts = periodPosts.filter(p => p.profile_id === profile.ordinal_id);
    const impressions = myPosts.reduce((s, p) => s + (p.impressions || 0), 0);
    const engagement = myPosts.reduce((s, p) => s + (p.likes || 0) + (p.comments || 0) + (p.shares || 0) + (p.clicks || 0), 0);
    const engRate = impressions > 0 ? (engagement / impressions) * 100 : 0;
    return { ...profile, periodImpressions: impressions, periodPosts: myPosts.length, periodEngRate: engRate };
  }).sort((a, b) => b.periodImpressions - a.periodImpressions);

  const max = Math.max(...stats.map(s => s.periodImpressions), 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {stats.length === 0 && (
        <div style={{ color: "#888", textAlign: "center", padding: 40 }}>No data for this period.</div>
      )}
      {stats.map((p, i) => (
        <div key={p.id} style={{ background: "#141414", border: "1px solid #262626", borderRadius: 12, padding: "14px 20px", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: i === 0 ? "#f59e0b" : i === 1 ? "#94a3b8" : i === 2 ? "#cd7c2f" : "#555", width: 28, textAlign: "center" }}>
            {i + 1}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div>
                <span style={{ fontWeight: 600, color: "#fff", fontSize: 15 }}>{p.name}</span>
                {p.role && <span style={{ color: "#888", fontSize: 12, marginLeft: 8 }}>{p.role}</span>}
              </div>
              <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
                <span style={{ color: "#888" }}>{p.periodPosts} posts</span>
                <span style={{ color: "#60a5fa" }}>{p.periodImpressions.toLocaleString()} <span style={{ color: "#555" }}>impressions</span></span>
                <span style={{ color: "#34d399" }}>{p.periodEngRate.toFixed(2)}% <span style={{ color: "#555" }}>eng rate</span></span>
                <span style={{ color: "#a78bfa" }}>{(p.follower_count || 0).toLocaleString()} <span style={{ color: "#555" }}>followers</span></span>
              </div>
            </div>
            <div style={{ height: 6, background: "#262626", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(p.periodImpressions / max) * 100}%`, background: "linear-gradient(90deg, #2563eb, #8b5cf6)", borderRadius: 3, transition: "width 0.6s ease" }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}