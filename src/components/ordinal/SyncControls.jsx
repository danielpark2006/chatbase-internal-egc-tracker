import { useState } from "react";
import { base44 } from "@/api/base44Client";

export default function SyncControls({ onSynced }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(null);

  const run = async (fn, label) => {
    setLoading(label);
    setStatus(null);
    try {
      const res = await base44.functions.invoke(fn, {});
      setStatus({ ok: true, message: `${label} complete. ${res.data?.synced ?? ""} records synced.` });
      if (onSynced) onSynced();
    } catch (e) {
      setStatus({ ok: false, message: e.message });
    } finally {
      setLoading(null);
    }
  };

  const btn = (label, fn) => (
    <button
      key={fn}
      onClick={() => run(fn, label)}
      disabled={!!loading}
      style={{
        background: loading === label ? "#1d4ed8" : "#2563eb",
        color: "#fff", border: "none", borderRadius: 8,
        padding: "9px 16px", fontSize: 13, fontWeight: 600,
        cursor: loading ? "not-allowed" : "pointer", opacity: loading && loading !== label ? 0.5 : 1
      }}
    >
      {loading === label ? "Syncing..." : label}
    </button>
  );

  return (
    <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#888", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Ordinal Sync</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {btn("Sync Profiles", "syncProfiles")}
        {btn("Sync Post Analytics", "syncPostAnalytics")}
        {btn("Sync Followers", "syncFollowers")}
        <button
          onClick={() => run("fullSync", "Full Sync")}
          disabled={!!loading}
          style={{
            background: loading === "Full Sync" ? "#065f46" : "#059669",
            color: "#fff", border: "none", borderRadius: 8,
            padding: "9px 18px", fontSize: 13, fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer", opacity: loading && loading !== "Full Sync" ? 0.5 : 1
          }}
        >
          {loading === "Full Sync" ? "Syncing..." : "⚡ Full Sync"}
        </button>
      </div>
      {status && (
        <div style={{ marginTop: 10, fontSize: 13, color: status.ok ? "#4ade80" : "#f87171" }}>
          {status.ok ? "✓" : "✗"} {status.message}
        </div>
      )}
    </div>
  );
}