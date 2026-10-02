const crypto = require('crypto');
const express = require('express');
const { TABLE_KINDS, readAll } = require('../lib/store');

const router = express.Router();

/**
 * GET /api/admin/export — read/export signups.
 *
 *   Header:  x-admin-token: <ADMIN_EXPORT_TOKEN>
 *   Query:   ?type=waitlist|applications|contact|all   (default: all)
 *            ?format=json|csv                          (default: json;
 *                                                       csv needs a single type)
 *
 * Disabled entirely (404) unless ADMIN_EXPORT_TOKEN is set, so a missing
 * env var can never mean "open to everyone".
 */

const MIN_TOKEN_LENGTH = 32;

function tokenMatches(provided, expected) {
  if (typeof provided !== 'string') return false;
  // Hash both sides so timingSafeEqual always compares equal-length buffers
  // and the comparison time doesn't leak the expected token's length.
  const a = crypto.createHash('sha256').update(provided).digest();
  const b = crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_EXPORT_TOKEN;
  if (!expected || expected.length < MIN_TOKEN_LENGTH) {
    return res.status(404).json({ error: 'Not found.' });
  }
  if (!tokenMatches(req.get('x-admin-token'), expected)) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }
  return next();
}

function csvCell(value) {
  let s = value === null || value === undefined ? '' : String(value);
  // Neutralise spreadsheet formula injection from user-submitted text.
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

function toCsv(rows) {
  if (rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const lines = [headers.map(csvCell).join(',')];
  for (const row of rows) lines.push(headers.map((h) => csvCell(row[h])).join(','));
  return `${lines.join('\r\n')}\r\n`;
}

router.get('/admin/export', requireAdmin, async (req, res) => {
  const type = req.query.type || 'all';
  const format = req.query.format || 'json';

  if (type !== 'all' && !TABLE_KINDS.includes(type)) {
    return res.status(400).json({ error: `type must be one of: all, ${TABLE_KINDS.join(', ')}.` });
  }
  if (format !== 'json' && format !== 'csv') {
    return res.status(400).json({ error: 'format must be json or csv.' });
  }
  if (format === 'csv' && type === 'all') {
    return res.status(400).json({ error: 'csv export needs a single type.' });
  }

  res.set('Cache-Control', 'no-store');

  try {
    if (format === 'csv') {
      const rows = await readAll(type);
      const date = new Date().toISOString().slice(0, 10);
      res.set('Content-Type', 'text/csv; charset=utf-8');
      res.set('Content-Disposition', `attachment; filename="flash-${type}-${date}.csv"`);
      return res.send(toCsv(rows));
    }

    const kinds = type === 'all' ? TABLE_KINDS : [type];
    const result = {};
    for (const kind of kinds) {
      const rows = await readAll(kind);
      result[kind] = { count: rows.length, rows };
    }
    return res.json(result);
  } catch (err) {
    console.error('admin export failed:', err.message);
    return res.status(500).json({ error: 'Export failed.' });
  }
});

module.exports = router;
