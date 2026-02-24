import { useState } from "react";
import { base44 } from "@/api/base44Client";

const inputStyle = { width: "100%", padding: "8px 12px", background: "#1a1a1a", border: "1px solid #333", borderRadius: 6, color: "#fff", fontSize: 14, boxSizing: "border-box" };
const labelStyle = { fontSize: 12, color: "#888", display: "block", marginBottom: 4 };

export default function TeamManager({ team, onTeamChange }) {
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    setAdding(true);
    const member = await base44.entities.TeamMember.create({ name: newName.trim(), active: true });
    onTeamChange([...team, member]);
    setNewName("");
    setAdding(false);
  };

  const handleRemove = async (member) => {
    await base44.entities.TeamMember.delete(member.id);
    onTeamChange(team.filter(m => m.id !== member.id));
  };

  return (
    <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 12, padding: 20 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 16 }}>Team Members</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {team.map(m => (
          <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1a1a1a", borderRadius: 8, padding: "10px 14px" }}>
            <span style={{ color: "#fff", fontSize: 14 }}>{m.name}</span>
            <button
              onClick={() => handleRemove(m)}
              style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 12, padding: "2px 8px", borderRadius: 4 }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAdd()}
            placeholder="Add team member name..."
            style={inputStyle}
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={adding || !newName.trim()}
          style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", opacity: adding ? 0.6 : 1 }}
        >
          {adding ? "Adding..." : "+ Add"}
        </button>
      </div>
    </div>
  );
}