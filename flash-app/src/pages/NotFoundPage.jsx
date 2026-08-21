import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { usePageMeta } from '../hooks/usePageMeta';

const SUGGESTIONS = [
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/stores', label: 'Sell on Flash' },
  { to: '/drivers', label: 'Drive with Flash' },
  { to: '/faq', label: 'FAQ' },
  { to: '/investors', label: 'Investors' },
];

export default function NotFoundPage() {
  usePageMeta('Page Not Found — Flash', "The page you're looking for doesn't exist.");

  return (
    <section style={{ textAlign: 'center', padding: 'var(--space-32) 0' }}>
      <div className="container">
        <Reveal className="section-eyebrow" style={{ justifyContent: 'center' }}>404</Reveal>
        <Reveal as="h1" delay={80} className="section-heading" style={{ margin: '0 auto', fontSize: 'var(--text-6xl)' }}>
          This page doesn&rsquo;t exist.
        </Reveal>
        <Reveal delay={140} className="section-lede" style={{ margin: 'var(--space-5) auto 0' }}>
          The link you followed may be broken or the page may have moved. Let&rsquo;s get you back on track.
        </Reveal>

        <Reveal delay={220} style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', marginTop: 'var(--space-10)', flexWrap: 'wrap' }}>
          <Link className="btn btn--primary" to="/">Go to Homepage</Link>
          <Link className="btn btn--ghost" to="/contact">Contact Support</Link>
        </Reveal>

        <Reveal delay={300} style={{ marginTop: 'var(--space-16)' }}>
          <p style={{ color: 'var(--flash-gray-500)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            Or try one of these pages:
          </p>
          <nav style={{ display: 'flex', gap: 'var(--space-6)', justifyContent: 'center', flexWrap: 'wrap' }}>
            {SUGGESTIONS.map((s) => (
              <Link key={s.to} to={s.to} style={{ color: 'var(--flash-amber-400)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                {s.label}
              </Link>
            ))}
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
