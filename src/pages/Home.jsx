import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import SyncControls from "../components/ordinal/SyncControls";
import PeriodSelector from "../components/ordinal/PeriodSelector";
import PeriodStatCards from "../components/ordinal/PeriodStatCards";
import PeriodLeaderboard from "../components/ordinal/PeriodLeaderboard";
import QuotaTracker from "../components/ordinal/QuotaTracker";
import EmployeeCards from "../components/ordinal/EmployeeCards";
import PostAnalyticsTable from "../components/ordinal/PostAnalyticsTable";
import OrdinalGrowthChart from "../components/ordinal/OrdinalGrowthChart";

export default function App() {
  const [profiles, setProfiles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("week");
  const [view, setView] = useState("leaderboard");

  const loadData = async () => {
    setLoading(true);
    const [p, a] = await Promise.all([
      base44.entities.OrdinalProfile.list("-total_impressions"),
      base44.entities.PostAnalytic.list("-post_date", 500),
    ]);
    setProfiles(p || []);
    setPosts(a || []);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const tabs = [
    ["leaderboard", "🏆 Leaderboard"],
    ["cards", "👤 Team Cards"],
    ["posts", "📄 Post Analytics"],
    ["growth", "📈 Growth"],
  ];

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#0a0a0a", color: "#e5e5e5", minHeight: "100vh", padding: "24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699dc22777ae3667ad134a90/1214b4d5a_Wordmark-Dark.png"
            alt="Chatbase"
            style={{ height: 64, marginBottom: 6, filter: "invert(1)" }}
          />
          <p style={{ color: "#888", margin: "4px 0 0", fontSize: 14 }}>LinkedIn EGC Tracker — Powered by Ordinal</p>
        </div>

        {/* Sync Controls */}
        <SyncControls onSynced={loadData} />

        {loading ? (
          <div style={{ color: "#888", textAlign: "center", padding: 60, fontSize: 16 }}>Loading...</div>
        ) : (
          <>
            {/* Period Selector */}
            <PeriodSelector period={period} onChange={setPeriod} />

            {/* Period Stat Cards */}
            <PeriodStatCards profiles={profiles} posts={posts} period={period} />

            {/* Quota Tracker */}
            <QuotaTracker profiles={profiles} posts={posts} period={period} />

            {/* Tabs */}
            <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "#141414", borderRadius: 8, padding: 4 }}>
              {tabs.map(([k, l]) => (
                <button key={k} onClick={() => setView(k)} style={{
                  flex: 1, padding: "10px 12px",
                  background: view === k ? "#262626" : "transparent",
                  color: view === k ? "#fff" : "#888",
                  border: "none", borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: "pointer"
                }}>{l}</button>
              ))}
            </div>

            {/* Views */}
            {view === "leaderboard" && <PeriodLeaderboard profiles={profiles} posts={posts} period={period} />}
            {view === "cards" && <EmployeeCards profiles={profiles} />}
            {view === "posts" && (
              <div style={{ background: "#141414", border: "1px solid #262626", borderRadius: 12, padding: 20 }}>
                <PostAnalyticsTable posts={posts} />
              </div>
            )}
            {view === "growth" && <OrdinalGrowthChart posts={posts} />}
          </>
        )}
      </div>
    </div>
  );
}