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

    let totalSynced = 0;

    // Calculate date range: last 90 days
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    for (const profile of profiles) {
      const endpoint = profile.platform === "Twitter"
        ? `https://api.ordinal.so/analytics/x/${profile.ordinal_id}/posts`
        : `https://api.ordinal.so/analytics/linkedin/${profile.ordinal_id}/posts`;

      const res = await fetch(`${endpoint}?startDate=${startDate}&endDate=${endDate}`, {
        headers: { Authorization: `Bearer ${apiKey}` }
      });

      if (!res.ok) continue;

      const posts = await res.json();
      const postList = Array.isArray(posts) ? posts : (posts.posts || posts.data || []);

      let totalImpressions = 0;
      let totalEngagement = 0;
      let postCount = 0;

      for (const post of postList) {
        const impressions = post.impressions || post.views || 0;
        const likes = post.likes || post.reactions || 0;
        const comments = post.comments || 0;
        const shares = post.shares || post.reposts || post.reshares || 0;
        const clicks = post.clicks || post.linkClicks || 0;
        const engagementRate = impressions > 0 ? ((likes + comments + shares + clicks) / impressions) * 100 : 0;

        const postDate = post.publishedAt || post.date || post.createdAt || post.publishDate;
        const postDateStr = postDate ? postDate.split("T")[0] : null;
        if (!postDateStr) continue;

        const platformPostId = post.id || post.postId || post.urn || "";
        const existing = await base44.asServiceRole.entities.PostAnalytic.filter({ platform_post_id: platformPostId, profile_id: profile.ordinal_id });

        const data = {
          profile_id: profile.ordinal_id,
          employee_name: profile.name,
          post_date: postDateStr,
          post_text_preview: (post.text || post.content || post.copy || "").substring(0, 100),
          impressions,
          likes,
          comments,
          shares,
          clicks,
          engagement_rate: Math.round(engagementRate * 100) / 100,
          post_url: post.url || post.postUrl || "",
          platform_post_id: platformPostId
        };

        if (existing && existing.length > 0) {
          await base44.asServiceRole.entities.PostAnalytic.update(existing[0].id, data);
        } else {
          await base44.asServiceRole.entities.PostAnalytic.create(data);
        }

        totalImpressions += impressions;
        totalEngagement += (likes + comments + shares + clicks);
        postCount++;
        totalSynced++;
      }

      // Update profile computed stats
      const avgEngRate = totalImpressions > 0 ? Math.round((totalEngagement / totalImpressions) * 10000) / 100 : 0;
      await base44.asServiceRole.entities.OrdinalProfile.update(profile.id, {
        total_impressions: totalImpressions,
        total_posts: postCount,
        avg_engagement_rate: avgEngRate,
        last_synced: new Date().toISOString()
      });
    }

    return Response.json({ success: true, synced: totalSynced });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});