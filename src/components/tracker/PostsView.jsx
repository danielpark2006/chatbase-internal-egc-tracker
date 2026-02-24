export default function PostsView({ posts, onEdit, onDelete }) {
  const eng = p => p.reactions + p.comments + p.reposts;

  return (
    <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 12, overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #262626" }}>
              {["Author", "Post", "Date", "Reactions", "Comments", "Reposts", "Total", ""].map(h => (
                <th key={h} style={{ padding: "12px 14px", textAlign: "left", color: "#888", fontWeight: 500, fontSize: 11, whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...posts].sort((a, b) => new Date(b.date) - new Date(a.date)).map(p => (
              <tr key={p.id} style={{ borderBottom: "1px solid #1a1a1a" }}>
                <td style={{ padding: "10px 14px", fontWeight: 500, color: "#fff", whiteSpace: "nowrap" }}>{p.author}</td>
                <td style={{ padding: "10px 14px", maxWidth: 200 }}>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "none", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" }}
                      onMouseEnter={e => e.target.style.color = "#2563eb"}
                      onMouseLeave={e => e.target.style.color = "#fff"}
                    >{p.title}</a>
                  ) : (
                    <div style={{ color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
                  )}
                </td>
                <td style={{ padding: "10px 14px", color: "#888", whiteSpace: "nowrap" }}>{p.date}</td>
                <td style={{ padding: "10px 14px", color: "#8b5cf6", fontWeight: 600 }}>{p.reactions.toLocaleString()}</td>
                <td style={{ padding: "10px 14px", color: "#06b6d4", fontWeight: 600 }}>{p.comments.toLocaleString()}</td>
                <td style={{ padding: "10px 14px", color: "#f59e0b", fontWeight: 600 }}>{p.reposts.toLocaleString()}</td>
                <td style={{ padding: "10px 14px", color: "#10b981", fontWeight: 700 }}>{eng(p).toLocaleString()}</td>
                <td style={{ padding: "10px 14px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => onEdit(p)} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 12 }}>Edit</button>
                    <button onClick={() => onDelete(p.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 12 }}>Del</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}