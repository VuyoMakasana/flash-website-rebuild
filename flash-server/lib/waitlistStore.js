const fs = require('fs');
const path = require('path');

/**
 * Minimal file-backed store for waitlist entries.
 *
 * This is intentionally simple: a JSON array on disk, guarded by an
 * in-process write queue so concurrent requests can't corrupt it.
 *
 * KNOWN LIMITATION (documented, not hidden): this does not survive
 * a multi-instance/serverless deployment and has no dedupe beyond
 * a single email check. For real production use, swap this module
 * out for a real database (Postgres, etc.) — the two functions
 * below (`addEntry`, `findByEmail`) are the entire surface area
 * the rest of the app depends on, so the swap is contained here.
 */

const DATA_FILE = path.join(__dirname, '..', 'data', 'waitlist.json');

function readAll() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

let writeQueue = Promise.resolve();

function writeAll(entries) {
  writeQueue = writeQueue.then(
    () =>
      new Promise((resolve, reject) => {
        fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), (err) => {
          if (err) reject(err);
          else resolve();
        });
      })
  );
  return writeQueue;
}

async function findByEmail(email) {
  const entries = readAll();
  return entries.find((e) => e.email.toLowerCase() === email.toLowerCase());
}

async function addEntry({ email, role }) {
  const entries = readAll();
  entries.push({ email, role, joinedAt: new Date().toISOString() });
  await writeAll(entries);
  return entries.length;
}

module.exports = { addEntry, findByEmail };
