import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const apiKey = Deno.env.get("ORDINAL_API_KEY");
    const res = await fetch("https://api.ordinal.so/profiles/scheduling", {
      headers: { Authorization: `Bearer ${apiKey}` }
    });

    if (!res.ok) {
      const text = await res.text();
      return Response.json({ error: `Ordinal API error: ${res.status}`, details: text }, { status: 500 });
    }

    const profiles = await res.json();
    const results = [];

    for (const profile of profiles) {
      const existing = await base44.asServiceRole.entities.OrdinalProfile.filter({ ordinal_id: profile.id });
      const data = {
        ordinal_id: profile.id,
        name: profile.name || profile.displayName || profile.username || profile.id,
        platform: profile.platform || "LinkedIn",
        last_synced: new Date().toISOString()
      };

      if (existing && existing.length > 0) {
        await base44.asServiceRole.entities.OrdinalProfile.update(existing[0].id, data);
        results.push({ action: "updated", id: profile.id });
      } else {
        await base44.asServiceRole.entities.OrdinalProfile.create(data);
        results.push({ action: "created", id: profile.id });
      }
    }

    return Response.json({ success: true, synced: results.length, results });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});