import { useState } from "react";

export default function PostAnalyticsTable({ posts }) {
  const [filter, setFilter] = useState("all");

  const now = new Date();
  const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);

  const filtered = posts
    .filter(p => {
      if (filter === "week") return p.post_date && new Date(p.post_date) >= weekAgo;
      return true;
    })
    .sort((a, b) => {
      if (filter === "week") return (b.engagement_rate || 0) - (a.engagement_rate || 0);
      return new Date(b.post_date) - new Date(a.post_date);
    });

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[["all", "All Posts"], ["week", "This Week"]].map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} style={{
            padding: "7px 16px", borderRadius: 6, border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer",
            background: filter === k ? "#2563eb" : "#1a1a1a", color: filter === k ? "#fff" : "#888"
          }}>{l}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ color: "#888", textAlign: "center", padding: 40 }}>No posts yet. Run Sync Post Analytics to get started.</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #262626" }}>
                {["Employee", "Date", "Preview", "Impressions", "Likes", "Comments", "Shares", "Clicks", "Eng Rate", "Link"].map(h => (
                  <th key={h} style={{ color: "#888", fontWeight: 500, padding: "8px 10px", textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} style={{ borderBottom: "1px solid #1a1a1a" }}>
                  <td style={{ padding: "10px 10px", color: "#fff", fontWeight: 600, whiteSpace: "nowrap" }}>{p.employee_name}</td>
                  <td style={{ padding: "10px 10px", color: "#888", whiteSpace: "nowrap" }}>{p.post_date}</td>
                  <td style={{ padding: "10px 10px", color: "#ccc", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {p.post_text_preview || "—"}
                  </td>
                  <td style={{ padding: "10px 10px", color: "#60a5fa", textAlign: "right" }}>{(p.impressions || 0).toLocaleString()}</td>
                  <td style={{ padding: "10px 10px", color: "#f9a8d4", textAlign: "right" }}>{p.likes || 0}</td>
                  <td style={{ padding: "10px 10px", color: "#06b6d4", textAlign: "right" }}>{p.comments || 0}</td>
                  <td style={{ padding: "10px 10px", color: "#f59e0b", textAlign: "right" }}>{p.shares || 0}</td>
                  <td style={{ padding: "10px 10px", color: "#a78bfa", textAlign: "right" }}>{p.clicks || 0}</td>
                  <td style={{ padding: "10px 10px", color: "#34d399", textAlign: "right", fontWeight: 700 }}>{(p.engagement_rate || 0).toFixed(2)}%</td>
                  <td style={{ padding: "10px 10px" }}>
                    {p.post_url ? (
                      <a href={p.post_url} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "none", fontSize: 12 }}>View</a>
                    ) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}