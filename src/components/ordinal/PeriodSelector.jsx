export default function PeriodSelector({ period, onChange }) {
  const options = [
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
    { key: "year", label: "This Year" },
  ];

  return (
    <div style={{ display: "flex", gap: 4, background: "#141414", borderRadius: 8, padding: 4, marginBottom: 24 }}>
      {options.map(o => (
        <button
          key={o.key}
          onClick={() => onChange(o.key)}
          style={{
            flex: 1, padding: "9px 16px",
            background: period === o.key ? "#2563eb" : "transparent",
            color: period === o.key ? "#fff" : "#888",
            border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer",
            transition: "all 0.15s"
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}