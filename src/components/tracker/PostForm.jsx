const inputStyle = { width: "100%", padding: "8px 12px", background: "#1a1a1a", border: "1px solid #333", borderRadius: 6, color: "#fff", fontSize: 14, boxSizing: "border-box" };
const labelStyle = { fontSize: 12, color: "#888", display: "block", marginBottom: 4 };

export default function PostForm({ form, setForm, editId, onSubmit, onCancel, team }) {
  return (
    <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 12, padding: 20, marginBottom: 24 }}>
      <h3 style={{ margin: "0 0 16px", fontSize: 16, color: "#fff" }}>{editId ? "Edit Post" : "Log a LinkedIn Post"}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={labelStyle}>Author</label>
          <select value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} style={inputStyle}>
            {team.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Date</label>
          <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={inputStyle} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>Post Title</label>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="What's the post about?" style={inputStyle} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>Post URL</label>
          <input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} placeholder="https://linkedin.com/posts/..." style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Reactions</label>
          <input type="number" value={form.reactions} onChange={e => setForm({ ...form, reactions: e.target.value })} placeholder="0" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Comments</label>
          <input type="number" value={form.comments} onChange={e => setForm({ ...form, comments: e.target.value })} placeholder="0" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Reposts</label>
          <input type="number" value={form.reposts} onChange={e => setForm({ ...form, reposts: e.target.value })} placeholder="0" style={inputStyle} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <button onClick={onSubmit} style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, padding: "8px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
          {editId ? "Update" : "Add Post"}
        </button>
        <button onClick={onCancel} style={{ background: "#262626", color: "#aaa", border: "none", borderRadius: 6, padding: "8px 20px", fontSize: 14, cursor: "pointer" }}>Cancel</button>
      </div>
    </div>
  );
}