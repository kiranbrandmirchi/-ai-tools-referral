import { neon } from '@netlify/neon';

export async function handler(event) {
  const sql = neon();
  try {
    const rows = await sql`SELECT * FROM ads WHERE is_active = true`;
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(rows),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
