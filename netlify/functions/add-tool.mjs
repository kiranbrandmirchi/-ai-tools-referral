import { neon } from '@netlify/neon';

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, x-admin-key', 'Access-Control-Allow-Methods': 'POST, OPTIONS' }, body: '' };
  }
  const adminKey = event.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_KEY) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }
  const sql = neon();
  try {
    const t = JSON.parse(event.body);
    const result = await sql`
      INSERT INTO tools (name, category, description, short_description, referral_link, official_link, icon_emoji, is_featured, pricing, sort_order, is_active)
      VALUES (${t.name}, ${t.category}, ${t.description}, ${t.short_description}, ${t.referral_link}, ${t.official_link || ''}, ${t.icon_emoji || '🔧'}, ${t.is_featured || false}, ${t.pricing || 'Freemium'}, ${t.sort_order || 0}, ${t.is_active !== false})
      RETURNING *`;
    return { statusCode: 201, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(result[0]) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
