import { useState, useMemo, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import StatCards from "../components/tracker/StatCards";
import PostForm from "../components/tracker/PostForm";
import DashboardView from "../components/tracker/DashboardView";
import GrowthView from "../components/tracker/GrowthView";
import PostsView from "../components/tracker/PostsView";
import LeaderboardView from "../components/tracker/LeaderboardView";
import TeamManager from "../components/tracker/TeamManager";

const QUOTA = 3;

function getWeekKey(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const jan1 = new Date(d.getFullYear(), 0, 1);
  const days = Math.floor((d - jan1) / 86400000);
  const wk = Math.ceil((days + jan1.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${String(wk).padStart(2, "0")}`;
}

function getWeekLabel(wk) {
  const [, w] = wk.split("-W");
  return `W${parseInt(w)}`;
}

export default function App() {
  const [posts, setPosts] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [showTeamManager, setShowTeamManager] = useState(false);
  const [form, setForm] = useState({ author: "", date: "", url: "", title: "", reactions: "", comments: "", reposts: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [fetchedPosts, fetchedTeam] = await Promise.all([
      base44.entities.Post.list("-date"),
      base44.entities.TeamMember.list("name"),
    ]);
    setPosts(fetchedPosts);
    setTeam(fetchedTeam);
    setLoading(false);
  };

  const teamNames = team.map(m => m.name);

  const eng = p => (p.reactions || 0) + (p.comments || 0) + (p.reposts || 0);

  const stats = useMemo(() => {
    const totalPosts = posts.length;
    const totalReactions = posts.reduce((s, p) => s + (p.reactions || 0), 0);
    const totalComments = posts.reduce((s, p) => s + (p.comments || 0), 0);
    const totalReposts = posts.reduce((s, p) => s + (p.reposts || 0), 0);
    const totalEng = totalReactions + totalComments + totalReposts;
    const avgEng = totalPosts ? Math.round(totalEng / totalPosts) : 0;

    const byAuthor = {};
    teamNames.forEach(n => { byAuthor[n] = { posts: 0, reactions: 0, comments: 0, reposts: 0 }; });
    posts.forEach(p => {
      if (!byAuthor[p.author]) byAuthor[p.author] = { posts: 0, reactions: 0, comments: 0, reposts: 0 };
      byAuthor[p.author].posts++;
      byAuthor[p.author].reactions += (p.reactions || 0);
      byAuthor[p.author].comments += (p.comments || 0);
      byAuthor[p.author].reposts += (p.reposts || 0);
    });
    const authorStats = Object.entries(byAuthor)
      .map(([name, d]) => ({ name, ...d, engagement: d.reactions + d.comments + d.reposts }))
      .sort((a, b) => b.engagement - a.engagement);

    const topPost = posts.length ? [...posts].sort((a, b) => eng(b) - eng(a))[0] : null;
    const active = authorStats.filter(a => a.posts > 0).length;

    const byWeek = {};
    posts.forEach(p => {
      if (!p.date) return;
      const wk = getWeekKey(p.date);
      if (!byWeek[wk]) byWeek[wk] = { week: wk, reactions: 0, comments: 0, reposts: 0, posts: 0, engagement: 0 };
      byWeek[wk].reactions += (p.reactions || 0);
      byWeek[wk].comments += (p.comments || 0);
      byWeek[wk].reposts += (p.reposts || 0);
      byWeek[wk].posts++;
      byWeek[wk].engagement += eng(p);
    });
    const weeklyData = Object.values(byWeek)
      .sort((a, b) => a.week.localeCompare(b.week))
      .map(w => ({ ...w, label: getWeekLabel(w.week) }));

    let wowGrowth = null;
    if (weeklyData.length >= 2) {
      const curr = weeklyData[weeklyData.length - 1].engagement;
      const prev = weeklyData[weeklyData.length - 2].engagement;
      wowGrowth = prev ? Math.round(((curr - prev) / prev) * 100) : null;
    }

    const quotaByWeek = {};
    posts.forEach(p => {
      if (!p.date) return;
      const wk = getWeekKey(p.date);
      if (!quotaByWeek[wk]) quotaByWeek[wk] = {};
      if (!quotaByWeek[wk][p.author]) quotaByWeek[wk][p.author] = 0;
      quotaByWeek[wk][p.author]++;
    });
    const currentWeek = getWeekKey(new Date().toISOString().split("T")[0]);
    const currentQuota = quotaByWeek[currentWeek] || {};

    return { totalPosts, totalReactions, totalComments, totalReposts, totalEng, avgEng, authorStats, topPost, active, weeklyData, wowGrowth, currentQuota };
  }, [posts, team]);

  const defaultForm = () => ({ author: teamNames[0] || "", date: "", url: "", title: "", reactions: "", comments: "", reposts: "" });

  const handleSubmit = async () => {
    if (!form.title || !form.date) return;
    const entry = {
      author: form.author,
      date: form.date,
      url: form.url,
      title: form.title,
      reactions: Number(form.reactions) || 0,
      comments: Number(form.comments) || 0,
      reposts: Number(form.reposts) || 0,
    };
    if (editId !== null) {
      const updated = await base44.entities.Post.update(editId, entry);
      setPosts(posts.map(p => p.id === editId ? updated : p));
      setEditId(null);
    } else {
      const created = await base44.entities.Post.create(entry);
      setPosts([created, ...posts]);
    }
    setForm(defaultForm());
    setShowForm(false);
  };

  const startEdit = (p) => {
    setForm({ author: p.author, date: p.date, url: p.url || "", title: p.title, reactions: p.reactions, comments: p.comments, reposts: p.reposts });
    setEditId(p.id);
    setShowForm(true);
    setView("posts");
  };

  const handleDelete = async (id) => {
    await base44.entities.Post.delete(id);
    setPosts(posts.filter(p => p.id !== id));
  };

  if (loading) {
    return (
      <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#0a0a0a", color: "#e5e5e5", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#888", fontSize: 16 }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#0a0a0a", color: "#e5e5e5", minHeight: "100vh", padding: "24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699dc22777ae3667ad134a90/1214b4d5a_Wordmark-Dark.png" alt="Chatbase" style={{ height: 64, marginBottom: 6, filter: "invert(1)" }} />
            <p style={{ color: "#888", margin: "4px 0 0", fontSize: 14 }}>LinkedIn EGC Tracker // Quota: {QUOTA} posts/week per person</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => { setShowTeamManager(!showTeamManager); setShowForm(false); }}
              style={{ background: "#262626", color: "#aaa", border: "1px solid #333", borderRadius: 8, padding: "10px 16px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}
            >
              👥 Team
            </button>
            <button
              onClick={() => { setShowForm(!showForm); setEditId(null); setForm(defaultForm()); setShowTeamManager(false); }}
              style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
            >
              + Add Post
            </button>
          </div>
        </div>

        {/* Team Manager */}
        {showTeamManager && (
          <div style={{ marginBottom: 24 }}>
            <TeamManager team={team} onTeamChange={setTeam} />
          </div>
        )}

        {/* Post Form */}
        {showForm && (
          <PostForm
            form={form}
            setForm={setForm}
            editId={editId}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditId(null); }}
            team={teamNames}
          />
        )}

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "#141414", borderRadius: 8, padding: 4 }}>
          {[["dashboard", "Dashboard"], ["growth", "Growth"], ["posts", "All Posts"], ["leaderboard", "Leaderboard"]].map(([k, l]) => (
            <button key={k} onClick={() => setView(k)} style={{ flex: 1, padding: "10px 16px", background: view === k ? "#262626" : "transparent", color: view === k ? "#fff" : "#888", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all 0.15s" }}>{l}</button>
          ))}
        </div>

        {/* Views */}
        {view === "dashboard" && (
          <>
            <StatCards stats={stats} />
            <DashboardView stats={stats} team={team} />
          </>
        )}
        {view === "growth" && <GrowthView weeklyData={stats.weeklyData} />}
        {view === "posts" && <PostsView posts={posts} onEdit={startEdit} onDelete={handleDelete} />}
        {view === "leaderboard" && <LeaderboardView authorStats={stats.authorStats} />}
      </div>
    </div>
  );
}