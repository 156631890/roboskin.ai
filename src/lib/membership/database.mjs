import pg from 'pg';

let pool;
export function database(connectionString) {
  pool ??= new pg.Pool({ connectionString, max: 4, connectionTimeoutMillis: 3000, idleTimeoutMillis: 10000,
    statement_timeout: 10000, application_name: 'roboskin-reports' });
  return pool;
}

export async function transaction(db, run) {
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    const result = await run(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally { client.release(); }
}
