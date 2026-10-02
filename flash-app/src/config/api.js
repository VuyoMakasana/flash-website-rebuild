// Base URL for the marketing-site forms (waitlist, contact, driver/seller
// applications). They're served by the production Flash-App backend's
// marketingRoutes, not by anything in this project. VITE_API_URL overrides
// it at build time (e.g. to point a build at a staging backend).
const DEFAULT_API_BASE = 'https://api.flashdelivery.co.za/api';

export const API_BASE = (import.meta.env.VITE_API_URL || DEFAULT_API_BASE).replace(/\/+$/, '');
