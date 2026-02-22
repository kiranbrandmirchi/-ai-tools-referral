import { neon } from '@netlify/neon';

export default async (req, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, x-admin-key',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (req.method === 'OPTIONS') {
    return new Response('', { status: 204, headers });
  }

  try {
    const sql = neon();
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing id parameter' }), { status: 400, headers });
    }

    const rows = await sql`SELECT * FROM tools WHERE id = ${id} AND is_active = true LIMIT 1`;

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Tool not found' }), { status: 404, headers });
    }

    return new Response(JSON.stringify(rows[0]), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
  }
};

export const config = {
  path: "/.netlify/functions/get-tool"
};
