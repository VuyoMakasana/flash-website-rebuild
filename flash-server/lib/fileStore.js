const fs = require('fs');
const path = require('path');

/**
 * Same pattern as waitlistStore.js — a JSON-file-backed list with an
 * in-process write queue, generalized so applications and contact
 * messages don't need their own copy-pasted implementation.
 *
 * Same documented limitation as waitlistStore: fine for a single-instance
 * MVP, not for multi-instance/serverless. Swap `readAll`/`writeAll` for a
 * real database call when this needs to scale.
 */

function createStore(filename) {
  const DATA_FILE = path.join(__dirname, '..', 'data', filename);

  function readAll() {
    try {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
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

  async function addEntry(entry) {
    const entries = readAll();
    entries.push({ ...entry, submittedAt: new Date().toISOString() });
    await writeAll(entries);
    return entries.length;
  }

  return { addEntry, readAll };
}

module.exports = { createStore };
