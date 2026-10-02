// Vercel serverless entry for the marketing-site API.
//
// The Express app lives in ../flash-server (so it can still run standalone
// in local dev); this file just hands it to Vercel. vercel.json rewrites
// every /api/* request here, and Express routes on the original path.
// flash-server's own dependencies are installed by vercel.json's
// installCommand.
import app from '../../flash-server/server.js';

export default app;
