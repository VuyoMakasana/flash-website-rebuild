const { PostgrestClient } = require('@supabase/postgrest-js');

/**
 * Server-only Supabase (PostgREST) client. Uses the project's secret
 * (service-role) key, so it must never be shipped to the browser. The
 * marketing-site tables (flash_site_*) have RLS on with no policies, so the
 * public anon key can't read them — only this client can.
 *
 * Uses @supabase/postgrest-js rather than the full @supabase/supabase-js:
 * this server only needs table reads/writes, and supabase-js's realtime
 * client refuses to load on Node < 22 without a WebSocket polyfill.
 *
 * Created lazily so the server still boots (and /api/health still answers)
 * when the env vars are missing; requests that need the DB fail with a 500
 * and a clear log line instead.
 */

let client = null;

function getSupabase() {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.');
  }

  client = new PostgrestClient(`${url.replace(/\/+$/, '')}/rest/v1`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  return client;
}

module.exports = { getSupabase };
