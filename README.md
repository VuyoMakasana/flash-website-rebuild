# FLASH — Website Rebuild

Same-day clothing delivery. Port Elizabeth (Gqeberha), South Africa. Coming soon.

## 1. Summary

Full multi-page rebuild of the FLASH marketing site as a React SPA (React
Router), mirroring the original static site's full page structure — not
just the homepage. Every page below is a real route with real, extracted
content from the original `FLASH-WEBSITE` repo, not placeholder text.

**Pages built:** Home, About, How It Works, Sell on Flash (Stores), Drive
with Flash (Drivers), Investors, FAQ, Contact, Careers, Press, Privacy,
Terms, Cookies, Security, Accessibility, 404.

**A factual correction, not a silent edit:** the original repo contradicts
itself on Flash's origin city. `investors.html`'s own founder quote says
Port Elizabeth. But `about.html` and `press.html` say "founded in Cape
Town," and several pages list "Cape Town and Johannesburg" as current
markets. Since Port Elizabeth/Gqeberha is confirmed everywhere else, every
Cape Town/Johannesburg reference — across page copy, legal documents, job
locations, and meta descriptions — was corrected to Gqeberha, Port
Elizabeth. Grep-verified: zero remaining references in the shipped code.

**Also dropped:** an anonymized testimonial quote from the merchant page
("Flash doubled my reach..." — unattributed to a real person) — not
presented as social proof per the standing "no fabricated testimonials"
instruction.

**Still not built:** a "Size Intelligence" section and a "Flash Closet"
section, requested again in this round. Nothing in the actual FLASH
codebase or product copy supports either feature, so — consistent with
every previous pass — they're not here.

## 2. Project structure

```
flash-app/                     React frontend (Vite + React Router)
  src/
    components/                Nav, Splash, AudioControl, OrderCard, Reveal,
                                PageHeader, LegalBlocks, InfoGrid, StatRow,
                                InlineForm, Layout, icons
    context/AudioContext.jsx   Global audio manager
    hooks/                     useReveal, usePrefersReducedMotion, usePageMeta
    pages/                     One file per route (15 pages + Home)
    sections/                  Homepage sections (Hero, WhyFlash, etc.)
    data/                      Structured content per page, extracted from
                                the original site's HTML — content.js,
                                aboutContent.js, howItWorksContent.js,
                                driverContent.js, merchantContent.js,
                                investorContent.js, careersContent.js,
                                pressContent.js, contactContent.js,
                                faqContent.js, legalContent.js
    styles/                    tokens.css (design system), base.css,
                                reveal.css, legal.css
    assets/founder/            Optimized founder photo (webp x3 + jpg fallback)
  public/audio/background.m4a  Real audio asset carried over from the existing repo
  public/brand/flash-logo.png  Existing logo asset

flash-server/                  Express backend
  server.js                    Entry point — helmet, CORS, rate limiting
  routes/
    waitlist.js                POST /api/waitlist
    applications.js            POST /api/applications/driver, /api/applications/seller
    contact.js                 POST /api/contact
  lib/
    waitlistStore.js           JSON-file storage for waitlist
    fileStore.js                Generalized JSON-file storage used by applications/contact
  data/                        Signup/application/message data (gitignored, seeded empty)
```

## 3. Technologies used

- **Frontend:** React 19 + Vite + React Router (client-side routing — no
  server-side rendering, see the SEO caveat in section 13). Plain CSS, no
  Tailwind, no CSS-in-JS, no animation library.
- **Backend:** Node.js + Express.

## 4. Dependencies added

Frontend: `react`, `react-dom`, `react-router-dom`.

Backend: `express`, `cors`, `helmet`, `express-rate-limit`, `dotenv`.


## 5. How the audio system works

One `<audio>` element, created once in `AudioContext.jsx` and never
re-mounted. On load it attempts `audio.play()`; if the browser's autoplay
policy blocks it (this is expected on iOS Safari and most mobile Chrome),
the promise rejects and the app falls into a `needsActivation` state instead
of retrying in a loop or faking playback. The `AudioControl` button reflects
three real states — off, needs activation, playing — never a fourth fake one.
Mute preference is stored in `localStorage` and restored on next visit.
Navigating the page never touches the audio element, so it can't restart.

## 6. How the splash screen works

`Splash.jsx` renders a fixed overlay with `FLASH` revealed letter-by-letter
(staggered blur-to-sharp, `ease-out`), then fades out automatically after a
short hold. It's `aria-hidden` and `role="presentation"` throughout — screen
readers and keyboard users go straight to real content, they're never
gated behind the animation. Under `prefers-reduced-motion`, letters render
instantly and the hold/exit times shrink instead of using the choreographed
animation.

## 7. How the responsive system works

`clamp()`-based fluid type scale in `tokens.css` (`--text-5xl` through
`--text-8xl`), so headline sizes scale continuously with viewport width
rather than jumping at breakpoints. Layout grids collapse to a single
column below ~900px (`hero__grid`, `partner__grid`, `founder__grid`, etc.)
and `overflow-x: hidden` is set on `html`, `body`, and `#root` as a backstop
against accidental horizontal scroll.

## 8. How the animation system works

A single `useReveal` hook (IntersectionObserver-based) wraps content in
`Reveal.jsx`; every section uses the same fade/rise-in with staggered
delays. Transform and opacity only — nothing animates layout properties.
`prefers-reduced-motion` is checked in the hook itself: reduced-motion users
get `visible = true` immediately, no animation, no gating.

The signature interactive element — `OrderCard` — cycles through a
plausible order/dashboard state sequence on a fixed interval, pauses on a
resolved end-state under reduced motion, and is reused three times (hero,
Stores, Drivers) with different content so one visual language carries three
different stories, instead of three different card designs.

## 9. How the founder image is used

The uploaded photograph is used as-is — uncropped composition, unmodified
framing — resized into three responsive `.webp` widths (480/900/1600px) plus
a `.jpg` fallback, served via `srcset` in `Founder.jsx`. No stock image, no
generated likeness, no distortion beyond the standard grayscale/contrast
treatment applied consistently to the whole editorial section.

## 10. How the backend works

Three endpoint groups, all with the same posture — validated server-side,
rate-limited, no secrets hardcoded:

- `POST /api/waitlist` — email + role. Duplicate email is treated as an
  idempotent success, not an error.
- `POST /api/applications/driver` and `POST /api/applications/seller` —
  name, email, city, message. Backs the real application forms on the
  Drivers and Stores pages.
- `POST /api/contact` — name, email, subject (validated against a fixed
  set), message. Backs the Contact page form.

`helmet()` sets standard security headers; CORS is locked to
`ALLOWED_ORIGIN` (set in `.env`, template in `.env.example`).

**A bug was caught and fixed during testing, not just written and assumed
correct:** the rate limiter was originally mounted separately on each of
the three `app.use('/api', ...)` calls. Express runs every middleware
mounted at a matching path prefix, so a single request was passing through
the limiter three times — meaning real users would've hit "too many
requests" after roughly 3-4 actual actions, not the intended 20. Caught by
sending a sequence of real curl requests and watching it fail sooner than
it should have; fixed by mounting the limiter exactly once, ahead of all
three routers.

**Documented limitation:** storage is a JSON file on disk per endpoint
group (`lib/waitlistStore.js`, `lib/fileStore.js`), each guarded by an
in-process write queue. Fine for a single-instance MVP — every endpoint was
verified end-to-end with live curl requests, not just read for correctness.
Will **not** survive a multi-instance or serverless deployment and has no
export/admin view. Swapping in a real database only requires rewriting
those two files.

## 11. How to run locally

**Backend:**
```
cd flash-server
cp .env.example .env
npm install
npm run start    # or: node server.js
```
Runs on `http://localhost:4000`.

**Frontend:**
```
cd flash-app
cp .env.example .env
npm install
npm run dev
```
Runs on `http://localhost:5173` (or the port Vite picks).

## 12. Build production

```
cd flash-app && npm run build      # outputs to flash-app/dist
cd flash-server && node server.js  # run behind a process manager (pm2, systemd) in production
```

Frontend build was run and verified clean (`vite build`, 0 errors). Backend
routes were verified with live curl requests, not just read.

## 13. What still requires real FLASH data

- The order/delivery state labels ("Order confirmed," "Seller preparing,"
  "Driver collected," etc.) are plausible UX copy, not verified against an
  actual backend enum — the marketing repo has no API layer to source exact
  state names from. If the real Flash app backend has formal order-status
  values, those should replace these.
- FAQ answers about driver/seller onboarding are generic placeholders — real
  requirements and process details need to come from you.
- Waitlist emails currently just sit in a JSON file; there's no email
  confirmation or notification system wired up.
- Social links, contact details, and legal pages are not part of this build.

## 14. Limitations caused by browser/device policies

- Autoplay-with-sound is blocked by default on iOS Safari and most mobile
  Chrome; this is a browser policy, not something any code can reliably
  override, so the site correctly falls back to a tap-to-activate control
  rather than pretending otherwise.
- I do not have a browser in this environment to visually screenshot the
  final result. Structural checks were run — production build succeeded,
  linter passed with zero errors, dev server booted cleanly, every route
  (all 15 pages) was hit with real HTTP requests against the production
  build, and all 6 backend endpoints were hit with real curl requests — but
  an actual visual pass on a phone and desktop browser is still worth doing
  before you trust this fully.

## 15. SEO caveat specific to this being a client-rendered SPA

Each page sets its own `document.title` and meta description via a
`usePageMeta` hook, mirroring the original static site's distinct
per-page `<title>` tags. But because this is a client-rendered SPA with
no server-side rendering, that update only happens after JavaScript runs.
A search crawler or social-media link-unfurler that doesn't execute JS
will see `index.html`'s default title/description for every page, not the
per-page one. The original static site didn't have this problem — every
`.html` file had its real title baked in server-side. Fixing this properly
means adding server-side rendering or a prerendering step; flagged here
rather than left as a silent regression.
#   f l a s h - w e b s i t e - r e b u i l d  
 