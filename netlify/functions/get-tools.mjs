import { neon } from '@netlify/neon';

export async function handler(event) {
  const sql = neon();
  try {
    const category = event.queryStringParameters?.category;
    const search = event.queryStringParameters?.search;
    let query = 'SELECT * FROM tools WHERE is_active = true';
    const params = [];
    if (category && category !== 'all') {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }
    if (search) {
      params.push(`%${search.toLowerCase()}%`);
      query += ` AND (LOWER(name) LIKE $${params.length} OR LOWER(description) LIKE $${params.length} OR LOWER(category) LIKE $${params.length})`;
    }
    query += ' ORDER BY is_featured DESC, sort_order ASC, name ASC';
    const rows = await sql(query, params);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=300' },
      body: JSON.stringify(rows),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
