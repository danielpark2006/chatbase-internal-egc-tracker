export default function OrdinalLeaderboard({ profiles }) {
  const sorted = [...profiles].sort((a, b) => (b.total_impressions || 0) - (a.total_impressions || 0));
  const max = Math.max(...sorted.map(p => p.total_impressions || 0), 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {sorted.length === 0 && (
        <div style={{ color: "#888", textAlign: "center", padding: 40 }}>No profiles yet. Run Sync Profiles to get started.</div>
      )}
      {sorted.map((p, i) => (
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
                <span style={{ color: "#888" }}>{(p.total_posts || 0)} posts</span>
                <span style={{ color: "#60a5fa" }}>{(p.total_impressions || 0).toLocaleString()} <span style={{ color: "#555" }}>impressions</span></span>
                <span style={{ color: "#34d399" }}>{(p.avg_engagement_rate || 0).toFixed(2)}% <span style={{ color: "#555" }}>eng rate</span></span>
                <span style={{ color: "#a78bfa" }}>{(p.follower_count || 0).toLocaleString()} <span style={{ color: "#555" }}>followers</span></span>
              </div>
            </div>
            <div style={{ height: 6, background: "#262626", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${((p.total_impressions || 0) / max) * 100}%`, background: "linear-gradient(90deg, #2563eb, #8b5cf6)", borderRadius: 3, transition: "width 0.6s ease" }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}