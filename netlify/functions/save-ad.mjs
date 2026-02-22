import { neon } from '@netlify/neon';

export default async (req, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, x-admin-key',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (req.method === 'OPTIONS') {
    return new Response('', { status: 204, headers });
  }

  try {
    const adminKey = req.headers.get('x-admin-key') || '';
    const envKey = Netlify.env.get('ADMIN_KEY') || process.env.ADMIN_KEY || '';

    if (!envKey || adminKey !== envKey) {
      return new Response(JSON.stringify({ error: 'Invalid admin key' }), { status: 401, headers });
    }

    const sql = neon();
    const body = await req.json();
    const { id, slot, ad_content, is_active } = body;

    if (!id && !slot) {
      return new Response(JSON.stringify({ error: 'Missing id or slot' }), { status: 400, headers });
    }

    let rows;
    const content = ad_content || '';
    const active = is_active !== false;

    if (id) {
      rows = await sql`UPDATE ads SET ad_content = ${content}, is_active = ${active}, updated_at = NOW() WHERE id = ${id} RETURNING *`;
    } else {
      rows = await sql`UPDATE ads SET ad_content = ${content}, is_active = ${active}, updated_at = NOW() WHERE slot = ${slot} RETURNING *`;
    }

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Ad slot not found' }), { status: 404, headers });
    }

    return new Response(JSON.stringify(rows[0]), { status: 200, headers });
  } catch (err) {
    console.log('save-ad error:', err.message);
    return new Response(JSON.stringify({ error: 'Server error: ' + err.message }), { status: 500, headers });
  }
};
