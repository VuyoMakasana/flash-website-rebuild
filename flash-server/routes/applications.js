const express = require('express');
const { createStore } = require('../lib/fileStore');

const router = express.Router();

const driverStore = createStore('driver-applications.json');
const sellerStore = createStore('seller-applications.json');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = { name: 120, city: 60, message: 2000 };

function validateApplication(body) {
  const { name, email, city, message } = body || {};
  if (typeof name !== 'string' || !name.trim() || name.length > MAX_LEN.name) {
    return 'Please enter your name.';
  }
  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return 'Please enter a valid email address.';
  }
  if (city !== undefined && (typeof city !== 'string' || city.length > MAX_LEN.city)) {
    return 'Invalid city.';
  }
  if (typeof message !== 'string' || !message.trim() || message.length > MAX_LEN.message) {
    return 'Please enter a short message.';
  }
  return null;
}

router.post('/applications/driver', async (req, res) => {
  const error = validateApplication(req.body);
  if (error) return res.status(400).json({ error });

  const { name, email, city, message } = req.body;
  try {
    await driverStore.addEntry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      city: (city || '').trim(),
      message: message.trim(),
    });
    return res.status(201).json({ status: 'received' });
  } catch (err) {
    console.error('driver application write failed:', err.message);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

router.post('/applications/seller', async (req, res) => {
  const error = validateApplication(req.body);
  if (error) return res.status(400).json({ error });

  const { name, email, city, message } = req.body;
  try {
    await sellerStore.addEntry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      city: (city || '').trim(),
      message: message.trim(),
    });
    return res.status(201).json({ status: 'received' });
  } catch (err) {
    console.error('seller application write failed:', err.message);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
