require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const waitlistRouter = require('./routes/waitlist');
const applicationsRouter = require('./routes/applications');
const contactRouter = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 4000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

app.disable('x-powered-by');
app.use(helmet());
app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    methods: ['GET', 'POST'],
  })
);
app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Rate limit is mounted exactly once, ahead of every write router.
// (Mounting it separately per app.use('/api', ...) call would run it
// once per matching prefix per request, not once per request — that
// was tested and caught here rather than shipped.)
const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});

app.use('/api', writeLimiter);
app.use('/api', waitlistRouter);
app.use('/api', applicationsRouter);
app.use('/api', contactRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Unexpected server error.' });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`FLASH API listening on port ${PORT}`);
  });
}

module.exports = app;
