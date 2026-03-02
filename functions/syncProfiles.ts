import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

// Profiles seeded directly from Ordinal MCP (direct API calls to api.ordinal.so don't work from server)
const PROFILES = [
  { ordinal_id: "ed0c1dca-b074-436b-8e17-44ea2f1363cd", name: "Clint Kruger", role: "GTM / Sales", platform: "LinkedIn", follower_count: 648 },
  { ordinal_id: "8e9a3965-00fd-445e-bf25-d19b35d95a65", name: "Yasser Elsaid", role: "Founder", platform: "LinkedIn", follower_count: 42695 },
  { ordinal_id: "aa5b2707-10f2-431f-87ba-b68ae91249e3", name: "Sandra Đajic", role: "Marketing", platform: "LinkedIn", follower_count: 16793 },
  { ordinal_id: "51cb4f25-80cd-44c2-9c9d-9c3b8d3464f6", name: "Daniel Park", role: "Content", platform: "LinkedIn", follower_count: 3099 },
  { ordinal_id: "b3d580fd-2732-4ce8-b30b-19faac3f481c", name: "Humphrey Su", role: "Product / Growth", platform: "LinkedIn", follower_count: 2465 },
  { ordinal_id: "4423751c-c478-40f8-b368-b393a26cbb46", name: "Chatbase (Company)", role: "Company Page", platform: "LinkedIn", follower_count: 30768 },
  { ordinal_id: "b2fca835-3f40-4fab-b3e5-550f7c7f690d", name: "Clint Kruger", role: "GTM / Sales", platform: "Twitter", follower_count: 0 },
  { ordinal_id: "fc45732a-7e05-471c-9b26-3fc939eb3711", name: "Humphrey Su", role: "Product / Growth", platform: "Twitter", follower_count: 0 },
  { ordinal_id: "0bdcaf24-82b7-4726-b8ff-e41ad5052524", name: "Yasser Elsaid", role: "Founder", platform: "Twitter", follower_count: 0 },
];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const existing = await base44.asServiceRole.entities.OrdinalProfile.list();
    let created = 0, updated = 0;

    for (const profile of PROFILES) {
      const data = { ...profile, last_synced: new Date().toISOString() };
      const found = (existing || []).find(e => e.ordinal_id === profile.ordinal_id);
      if (found) {
        await base44.asServiceRole.entities.OrdinalProfile.update(found.id, data);
        updated++;
      } else {
        await base44.asServiceRole.entities.OrdinalProfile.create(data);
        created++;
      }
    }

    return Response.json({ success: true, synced: PROFILES.length, created, updated });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});