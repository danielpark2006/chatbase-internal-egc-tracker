import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

// Latest follower counts from Ordinal MCP (api.ordinal.so not reachable from server)
const FOLLOWER_COUNTS = {
  "ed0c1dca-b074-436b-8e17-44ea2f1363cd": 648,    // Clint LinkedIn
  "8e9a3965-00fd-445e-bf25-d19b35d95a65": 42695,  // Yasser LinkedIn
  "aa5b2707-10f2-431f-87ba-b68ae91249e3": 16793,  // Sandra LinkedIn
  "51cb4f25-80cd-44c2-9c9d-9c3b8d3464f6": 3099,   // Daniel LinkedIn
  "b3d580fd-2732-4ce8-b30b-19faac3f481c": 2465,   // Humphrey LinkedIn
  "4423751c-c478-40f8-b368-b393a26cbb46": 30768,  // Chatbase LinkedIn
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const profiles = await base44.asServiceRole.entities.OrdinalProfile.list();
    let synced = 0;

    for (const profile of profiles) {
      const count = FOLLOWER_COUNTS[profile.ordinal_id];
      if (count !== undefined) {
        await base44.asServiceRole.entities.OrdinalProfile.update(profile.id, {
          follower_count: count,
          last_synced: new Date().toISOString()
        });
        synced++;
      }
    }

    return Response.json({ success: true, synced });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});