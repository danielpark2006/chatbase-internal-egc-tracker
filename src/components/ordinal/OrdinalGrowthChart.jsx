import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Legend } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 8, padding: "10px 14px", fontSize: 13 }}>
      <div style={{ color: "#fff", fontWeight: 600, marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, marginBottom: 2 }}>{p.name}: {typeof p.value === "number" ? p.value.toLocaleString() : p.value}</div>
      ))}
    </div>
  );
};

export default function OrdinalGrowthChart({ posts }) {
  // Aggregate by week
  const byWeek = {};
  posts.forEach(p => {
    if (!p.post_date) return;
    const d = new Date(p.post_date + "T00:00:00");
    const jan1 = new Date(d.getFullYear(), 0, 1);
    const wk = Math.ceil((Math.floor((d - jan1) / 86400000) + jan1.getDay() + 1) / 7);
    const key = `${d.getFullYear()}-W${String(wk).padStart(2, "0")}`;
    if (!byWeek[key]) byWeek[key] = { week: key, impressions: 0, likes: 0, comments: 0, shares: 0, clicks: 0, posts: 0 };
    byWeek[key].impressions += (p.impressions || 0);
    byWeek[key].likes += (p.likes || 0);
    byWeek[key].comments += (p.comments || 0);
    byWeek[key].shares += (p.shares || 0);
    byWeek[key].clicks += (p.clicks || 0);
    byWeek[key].posts++;
  });

  const weeklyData = Object.values(byWeek)
    .sort((a, b) => a.week.localeCompare(b.week))
    .map(w => ({ ...w, label: `W${parseInt(w.week.split("-W")[1])}` }));

  if (weeklyData.length === 0) {
    return <div style={{ color: "#888", textAlign: "center", padding: 40 }}>No post data yet. Run Sync Post Analytics first.</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 16 }}>Impressions by Week</div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
            <XAxis dataKey="label" stroke="#888" fontSize={12} />
            <YAxis stroke="#888" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="impressions" stroke="#60a5fa" strokeWidth={3} dot={{ fill: "#60a5fa", r: 4 }} name="Impressions" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 12, padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 16 }}>Engagement Breakdown by Week</div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
            <XAxis dataKey="label" stroke="#888" fontSize={12} />
            <YAxis stroke="#888" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="likes" stackId="a" fill="#f9a8d4" name="Likes" />
            <Bar dataKey="comments" stackId="a" fill="#06b6d4" name="Comments" />
            <Bar dataKey="shares" stackId="a" fill="#f59e0b" name="Shares" />
            <Bar dataKey="clicks" stackId="a" fill="#a78bfa" name="Clicks" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}