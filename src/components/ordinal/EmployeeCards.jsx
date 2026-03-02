export default function EmployeeCards({ profiles }) {
  if (profiles.length === 0) {
    return <div style={{ color: "#888", textAlign: "center", padding: 40 }}>No profiles yet. Run Sync Profiles to get started.</div>;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
      {profiles.map(p => (
        <div key={p.id} style={{ background: "#141414", border: "1px solid #262626", borderRadius: 12, padding: 18 }}>
          <div style={{ fontWeight: 700, color: "#fff", fontSize: 15, marginBottom: 2 }}>{p.name}</div>
          {p.role && <div style={{ color: "#888", fontSize: 12, marginBottom: 12 }}>{p.role}</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Stat label="Impressions" value={(p.total_impressions || 0).toLocaleString()} color="#60a5fa" />
            <Stat label="Posts" value={p.total_posts || 0} color="#f9a8d4" />
            <Stat label="Eng Rate" value={`${(p.avg_engagement_rate || 0).toFixed(2)}%`} color="#34d399" />
            <Stat label="Followers" value={(p.follower_count || 0).toLocaleString()} color="#a78bfa" />
          </div>
          {p.last_synced && (
            <div style={{ marginTop: 12, fontSize: 11, color: "#555" }}>
              Synced {new Date(p.last_synced).toLocaleDateString()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ color: "#666", fontSize: 12 }}>{label}</span>
      <span style={{ color, fontWeight: 700, fontSize: 14 }}>{value}</span>
    </div>
  );
}