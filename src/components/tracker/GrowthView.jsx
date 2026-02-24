import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Legend } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 8, padding: "10px 14px", fontSize: 13 }}>
      <div style={{ color: "#fff", fontWeight: 600, marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, marginBottom: 2 }}>{p.name}: {p.value?.toLocaleString()}</div>
      ))}
    </div>
  );
};

export default function GrowthView({ weeklyData }) {
  return (
    <div>
      <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 16 }}>Total Engagement by Week</div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
            <XAxis dataKey="label" stroke="#888" fontSize={12} />
            <YAxis stroke="#888" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="engagement" stroke="#2563eb" strokeWidth={3} dot={{ fill: "#2563eb", r: 5 }} name="Total Engagement" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 16 }}>Breakdown by Week</div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
            <XAxis dataKey="label" stroke="#888" fontSize={12} />
            <YAxis stroke="#888" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="reactions" stackId="a" fill="#8b5cf6" name="Reactions" />
            <Bar dataKey="comments" stackId="a" fill="#06b6d4" name="Comments" />
            <Bar dataKey="reposts" stackId="a" fill="#f59e0b" name="Reposts" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 16 }}>Posts per Week</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
            <XAxis dataKey="label" stroke="#888" fontSize={12} />
            <YAxis stroke="#888" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="posts" fill="#2563eb" name="Posts" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}