import { neon } from '@netlify/neon';

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, x-admin-key', 'Access-Control-Allow-Methods': 'POST, OPTIONS' },
      body: ''
    };
  }

  const adminKey = event.headers['x-admin-key'] || event.headers['X-Admin-Key'];
  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    return {
      statusCode: 401,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const sql = neon();
    const t = JSON.parse(event.body);

    const name = t.name;
    const category = t.category;
    const description = t.description;
    const short_description = t.short_description;
    const referral_link = t.referral_link;
    const official_link = t.official_link || '';
    const icon_emoji = t.icon_emoji || '🔧';
    const is_featured = t.is_featured || false;
    const pricing = t.pricing || 'Freemium';
    const sort_order = t.sort_order || 0;
    const is_active = t.is_active !== false;

    const result = await sql`
      INSERT INTO tools (name, category, description, short_description, referral_link, official_link, icon_emoji, is_featured, pricing, sort_order, is_active)
      VALUES (${name}, ${category}, ${description}, ${short_description}, ${referral_link}, ${official_link}, ${icon_emoji}, ${is_featured}, ${pricing}, ${sort_order}, ${is_active})
      RETURNING *`;

    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(result[0])
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message })
    };
  }
}
