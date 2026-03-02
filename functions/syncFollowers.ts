import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const apiKey = Deno.env.get("ORDINAL_API_KEY");
    const profiles = await base44.asServiceRole.entities.OrdinalProfile.list();

    if (!profiles || profiles.length === 0) {
      return Response.json({ success: true, message: "No profiles found. Run Sync Profiles first.", synced: 0 });
    }

    let synced = 0;
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    for (const profile of profiles) {
      const endpoint = profile.platform === "Twitter"
        ? `https://api.ordinal.so/analytics/x/${profile.ordinal_id}/followers`
        : `https://api.ordinal.so/analytics/linkedin/${profile.ordinal_id}/followers`;

      const res = await fetch(`${endpoint}?startDate=${startDate}&endDate=${endDate}`, {
        headers: { Authorization: `Bearer ${apiKey}` }
      });

      if (!res.ok) continue;

      const data = await res.json();
      const followerHistory = Array.isArray(data) ? data : (data.followers || data.data || []);
      const latest = followerHistory.length > 0 ? followerHistory[followerHistory.length - 1] : null;
      const followerCount = latest ? (latest.count || latest.followerCount || latest.followers || 0) : 0;

      await base44.asServiceRole.entities.OrdinalProfile.update(profile.id, {
        follower_count: followerCount,
        last_synced: new Date().toISOString()
      });

      synced++;
    }

    return Response.json({ success: true, synced });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});