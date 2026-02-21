import { neon } from '@netlify/neon';

export async function handler(event) {
  const sql = neon();
  try {
    const category = event.queryStringParameters?.category;
    const search = event.queryStringParameters?.search;

    let rows;

    if (category && category !== 'all' && search) {
      const searchPattern = `%${search.toLowerCase()}%`;
      rows = await sql`SELECT * FROM tools WHERE is_active = true AND category = ${category} AND (LOWER(name) LIKE ${searchPattern} OR LOWER(description) LIKE ${searchPattern} OR LOWER(category) LIKE ${searchPattern}) ORDER BY is_featured DESC, sort_order ASC, name ASC`;
    } else if (category && category !== 'all') {
      rows = await sql`SELECT * FROM tools WHERE is_active = true AND category = ${category} ORDER BY is_featured DESC, sort_order ASC, name ASC`;
    } else if (search) {
      const searchPattern = `%${search.toLowerCase()}%`;
      rows = await sql`SELECT * FROM tools WHERE is_active = true AND (LOWER(name) LIKE ${searchPattern} OR LOWER(description) LIKE ${searchPattern} OR LOWER(category) LIKE ${searchPattern}) ORDER BY is_featured DESC, sort_order ASC, name ASC`;
    } else {
      rows = await sql`SELECT * FROM tools WHERE is_active = true ORDER BY is_featured DESC, sort_order ASC, name ASC`;
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=300' },
      body: JSON.stringify(rows),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
