import { neon } from '@netlify/neon';

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, x-admin-key', 'Access-Control-Allow-Methods': 'PUT, OPTIONS' }, body: '' };
  }
  const adminKey = event.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_KEY) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }
  if (event.httpMethod !== 'PUT') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }
  const sql = neon();
  try {
    const t = JSON.parse(event.body);
    if (!t.id) return { statusCode: 400, body: JSON.stringify({ error: 'Tool ID required' }) };
    const result = await sql`
      UPDATE tools SET name = COALESCE(${t.name}, name), category = COALESCE(${t.category}, category),
        description = COALESCE(${t.description}, description), short_description = COALESCE(${t.short_description}, short_description),
        referral_link = COALESCE(${t.referral_link}, referral_link), official_link = COALESCE(${t.official_link}, official_link),
        icon_emoji = COALESCE(${t.icon_emoji}, icon_emoji), is_featured = COALESCE(${t.is_featured}, is_featured),
        pricing = COALESCE(${t.pricing}, pricing), sort_order = COALESCE(${t.sort_order}, sort_order),
        is_active = COALESCE(${t.is_active}, is_active), updated_at = NOW()
      WHERE id = ${t.id} RETURNING *`;
    return { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(result[0]) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
