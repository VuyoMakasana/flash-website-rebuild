const express = require('express');
const { addEntry, findByEmail } = require('../lib/waitlistStore');

const router = express.Router();

const VALID_ROLES = new Set(['customer', 'seller', 'driver']);
// Simple, deliberately conservative email shape check — not a full RFC
// validator, but enough to reject obvious junk server-side.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/waitlist', async (req, res) => {
  const { email, role } = req.body || {};

  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (role !== undefined && !VALID_ROLES.has(role)) {
    return res.status(400).json({ error: 'Invalid role.' });
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    const existing = await findByEmail(cleanEmail);
    if (existing) {
      // Idempotent from the client's point of view — already on the list
      // is a success state, not an error.
      return res.status(200).json({ status: 'already-joined' });
    }

    await addEntry({ email: cleanEmail, role: role || 'customer' });
    return res.status(201).json({ status: 'joined' });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('waitlist write failed:', err.message);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
