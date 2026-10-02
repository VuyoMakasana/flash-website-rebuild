const { getSupabase } = require('./supabase');

/**
 * Supabase-backed storage for the marketing site. Replaces the old
 * JSON-file stores (waitlistStore.js / fileStore.js), which lost data on
 * serverless and had a read-modify-write race.
 *
 * Every write here is a single INSERT, so each one is atomic on its own:
 * two near-simultaneous submissions become two rows, never one overwriting
 * the other. Waitlist dedupe is enforced by the UNIQUE constraint on
 * flash_site_waitlist.email, not by a read-then-write check, so two
 * concurrent signups with the same email produce exactly one row.
 */

const TABLES = {
  waitlist: 'flash_site_waitlist',
  applications: 'flash_site_applications',
  contact: 'flash_site_contact',
};

// Supabase caps a single select at 1000 rows by default, so exports page.
const PAGE_SIZE = 1000;

/**
 * @returns {Promise<boolean>} true if a new row was created, false if the
 *   email was already on the list.
 */
async function joinWaitlist({ email, role }) {
  const { data, error } = await getSupabase()
    .from(TABLES.waitlist)
    .upsert({ email, role }, { onConflict: 'email', ignoreDuplicates: true })
    .select('id');
  if (error) throw new Error(error.message);
  return data.length > 0;
}

async function addApplication({ type, name, email, city, message }) {
  const { error } = await getSupabase()
    .from(TABLES.applications)
    .insert({ type, name, email, city, message });
  if (error) throw new Error(error.message);
}

async function addContactMessage({ name, email, subject, message }) {
  const { error } = await getSupabase()
    .from(TABLES.contact)
    .insert({ name, email, subject, message });
  if (error) throw new Error(error.message);
}

async function readAll(kind) {
  const table = TABLES[kind];
  if (!table) throw new Error(`Unknown table: ${kind}`);

  const rows = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await getSupabase()
      .from(table)
      .select('*')
      .order('id', { ascending: true })
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw new Error(error.message);
    rows.push(...data);
    if (data.length < PAGE_SIZE) return rows;
  }
}

module.exports = {
  TABLE_KINDS: Object.keys(TABLES),
  joinWaitlist,
  addApplication,
  addContactMessage,
  readAll,
};
