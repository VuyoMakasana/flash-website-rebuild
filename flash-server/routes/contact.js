const express = require('express');
const { createStore } = require('../lib/fileStore');

const router = express.Router();
const contactStore = createStore('contact-messages.json');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_SUBJECTS = new Set([
  'general',
  'customer-support',
  'seller-enquiry',
  'driver-enquiry',
  'investment',
  'press',
]);

router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (typeof name !== 'string' || !name.trim() || name.length > 120) {
    return res.status(400).json({ error: 'Please enter your name.' });
  }
  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (subject !== undefined && !VALID_SUBJECTS.has(subject)) {
    return res.status(400).json({ error: 'Invalid subject.' });
  }
  if (typeof message !== 'string' || !message.trim() || message.length > 2000) {
    return res.status(400).json({ error: 'Please enter a message.' });
  }

  try {
    await contactStore.addEntry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject || 'general',
      message: message.trim(),
    });
    return res.status(201).json({ status: 'received' });
  } catch (err) {
    console.error('contact message write failed:', err.message);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
