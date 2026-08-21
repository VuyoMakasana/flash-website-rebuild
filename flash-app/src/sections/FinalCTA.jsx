import { useState } from 'react';
import Reveal from '../components/Reveal';
import './FinalCTA.css';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const ROLES = [
  { value: 'customer', label: 'Customer' },
  { value: 'seller', label: 'Store / Seller' },
  { value: 'driver', label: 'Driver' },
];

export default function FinalCTA() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('customer');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(`${API_BASE}/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }
      setStatus('success');
    } catch {
      setErrorMsg('Could not reach the server. Please try again shortly.');
      setStatus('error');
    }
  }

  return (
    <section id="waitlist" className="final-cta">
      <div className="container final-cta__inner">
        <Reveal as="h2" className="final-cta__headline">
          The wait is
          <br />almost over.
        </Reveal>
        <Reveal delay={100} className="final-cta__sub">
          FLASH · Port Elizabeth, South Africa · Coming Soon
        </Reveal>

        {status === 'success' ? (
          <Reveal delay={180} className="final-cta__success" role="status">
            You&rsquo;re on the list. We&rsquo;ll email you the moment FLASH launches in Gqeberha.
          </Reveal>
        ) : (
          <Reveal delay={180} as="form" className="final-cta__form" onSubmit={handleSubmit}>
            <div className="final-cta__field">
              <label htmlFor="waitlist-email" className="visually-hidden">Email address</label>
              <input
                id="waitlist-email"
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="final-cta__roles" role="radiogroup" aria-label="I want to join as a">
              {ROLES.map((r) => (
                <label key={r.value} className={`final-cta__role ${role === r.value ? 'is-active' : ''}`}>
                  <input
                    type="radio"
                    name="role"
                    value={r.value}
                    checked={role === r.value}
                    onChange={() => setRole(r.value)}
                  />
                  {r.label}
                </label>
              ))}
            </div>

            <button type="submit" className="btn btn--primary btn--lg" disabled={status === 'loading'}>
              {status === 'loading' ? 'Joining\u2026' : 'Join the FLASH List'}
            </button>

            {status === 'error' && (
              <p className="final-cta__error" role="alert">{errorMsg}</p>
            )}
          </Reveal>
        )}
      </div>
    </section>
  );
}
