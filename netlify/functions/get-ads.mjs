import { neon } from '@netlify/neon';

export default async (req, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (req.method === 'OPTIONS') {
    return new Response('', { status: 204, headers });
  }

  try {
    const sql = neon();
    const rows = await sql`SELECT * FROM ads ORDER BY id`;
    return new Response(JSON.stringify(rows), { status: 200, headers });
  } catch (err) {
    console.log('get-ads error:', err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
  }
};
