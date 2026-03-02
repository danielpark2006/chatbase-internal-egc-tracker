import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const profilesRes = await base44.functions.invoke('syncProfiles', {});
    const analyticsRes = await base44.functions.invoke('syncPostAnalytics', {});
    const followersRes = await base44.functions.invoke('syncFollowers', {});

    return Response.json({
      success: true,
      profiles: profilesRes,
      analytics: analyticsRes,
      followers: followersRes
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});