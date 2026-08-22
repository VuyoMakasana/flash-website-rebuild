import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AudioControl from './AudioControl';
import './Nav.css';

const LINKS = [
  { href: '/#story', label: 'Story' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/stores', label: 'Stores' },
  { href: '/drivers', label: 'Drivers' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  // Close on Escape, trap focus while the mobile panel is open.
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = 'hidden';

    function handleKey(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll('a, button');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKey);
    const firstLink = panelRef.current?.querySelector('a');
    firstLink?.focus();

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  function handleLinkClick() {
    setOpen(false);
  }

  return (
    <header className="nav">
      <div className="nav__bar">
        <div className="container nav__row">
          <Link to="/" className="nav__wordmark">FLASH</Link>

          <nav className="nav__links" aria-label="Primary">
            {LINKS.map((link) => (
              <Link key={link.href} to={link.href}>{link.label}</Link>
            ))}
          </nav>

          <div className="nav__actions">
            <span className="nav__soon">Coming Soon</span>
            <AudioControl />
            <button
              ref={toggleRef}
              type="button"
              className="nav__toggle"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className={`nav__panel ${open ? 'nav__panel--open' : ''}`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        <nav aria-label="Mobile" onClick={(e) => e.stopPropagation()}>
          {LINKS.map((link) => (
            <Link key={link.href} to={link.href} onClick={handleLinkClick}>
              {link.label}
            </Link>
          ))}
        </nav>
        <span className="nav__panel-tag">Port Elizabeth, South Africa — Coming Soon</span>
      </div>
    </header>
  );
}
