import { getDateRange, formatDateRange } from "./dateRanges";

export default function PeriodSelector({ period, onChange }) {
  const options = [
    { key: "week", label: "Last 7 Days" },
    { key: "month", label: "Last 30 Days" },
    { key: "year", label: "Last 365 Days" },
  ];

  const { start, end } = getDateRange(period);

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", gap: 4, background: "#141414", borderRadius: 8, padding: 4 }}>
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
      <div style={{ textAlign: "center", fontSize: 12, color: "#555", marginTop: 6 }}>
        {formatDateRange(start, end)}
      </div>
    </div>
  );
}