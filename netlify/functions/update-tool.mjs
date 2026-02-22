import { neon } from '@netlify/neon';

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, x-admin-key', 'Access-Control-Allow-Methods': 'PUT, OPTIONS' }, body: '' };
  }
  const adminKey = event.headers['x-admin-key'] || event.headers['X-Admin-Key'];
  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    return { statusCode: 401, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: 'Unauthorized' }) };
  }
  if (event.httpMethod !== 'PUT') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }
  try {
    const sql = neon();
    const t = JSON.parse(event.body);
    if (!t.id) return { statusCode: 400, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: 'Tool ID required' }) };

    const id = t.id;
    const name = t.name;
    const category = t.category;
    const description = t.description;
    const short_description = t.short_description;
    const referral_link = t.referral_link;
    const official_link = t.official_link;
    const icon_emoji = t.icon_emoji;
    const is_featured = t.is_featured;
    const pricing = t.pricing;
    const sort_order = t.sort_order;
    const is_active = t.is_active;
    const video_url = t.video_url || '';
    const long_description = t.long_description || '';

    const result = await sql`
      UPDATE tools SET name=${name}, category=${category}, description=${description}, short_description=${short_description},
        referral_link=${referral_link}, official_link=${official_link}, icon_emoji=${icon_emoji}, is_featured=${is_featured},
        pricing=${pricing}, sort_order=${sort_order}, is_active=${is_active}, video_url=${video_url}, long_description=${long_description}, updated_at=NOW()
      WHERE id = ${id} RETURNING *`;
    return { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(result[0]) };
  } catch (error) {
    return { statusCode: 500, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: error.message }) };
  }
}
