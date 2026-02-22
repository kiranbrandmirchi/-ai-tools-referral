import { neon } from '@netlify/neon';

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, x-admin-key', 'Access-Control-Allow-Methods': 'POST, OPTIONS' }, body: '' };
  }

  const adminKey = event.headers['x-admin-key'] || event.headers['X-Admin-Key'];
  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    return { statusCode: 401, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  try {
    const sql = neon();
    const ad = JSON.parse(event.body);
    const slot = ad.slot;
    const ad_type = ad.ad_type || 'html';
    const ad_content = ad.ad_content || '';
    const ad_link = ad.ad_link || '';
    const ad_image = ad.ad_image || '';
    const is_active = ad.is_active !== false;

    const result = await sql`
      UPDATE ads SET ad_type = ${ad_type}, ad_content = ${ad_content}, ad_link = ${ad_link}, ad_image = ${ad_image}, is_active = ${is_active}, updated_at = NOW()
      WHERE slot = ${slot} RETURNING *`;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(result[0]),
    };
  } catch (error) {
    return { statusCode: 500, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: error.message }) };
  }
}
