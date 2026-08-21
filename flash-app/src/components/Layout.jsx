import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from './Nav';
import Footer from '../sections/Footer';

export default function Layout() {
  const location = useLocation();

  // Scroll to top on route change; scroll to the matching section when the
  // link carries a hash (e.g. the "Story" nav item -> /#story). Needed now
  // that Nav uses client-side <Link> navigation instead of full page loads,
  // which no longer scroll to URL fragments automatically.
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    const id = location.hash.slice(1);
    // Wait a tick so the target page's content has mounted before we look
    // for the element (relevant when navigating here from another route).
    const raf = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView();
    });
    return () => cancelAnimationFrame(raf);
  }, [location.pathname, location.hash]);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
