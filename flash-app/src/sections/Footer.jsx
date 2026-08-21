import { Link } from 'react-router-dom';
import './Footer.css';

const COMPANY = [
  { to: '/about', label: 'About' },
  { to: '/careers', label: 'Careers' },
  { to: '/press', label: 'Press' },
  { to: '/investors', label: 'Investors' },
  { to: '/contact', label: 'Contact' },
];

const PRODUCT = [
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/stores', label: 'Sell on Flash' },
  { to: '/drivers', label: 'Drive with Flash' },
  { to: '/faq', label: 'FAQ' },
];

const LEGAL = [
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
  { to: '/cookies', label: 'Cookies' },
  { to: '/security', label: 'Security' },
  { to: '/accessibility', label: 'Accessibility' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div>
            <Link to="/" className="footer__wordmark">FLASH</Link>
            <p className="footer__location">
              Gqeberha, Port Elizabeth<br />South Africa<br />Coming Soon
            </p>
          </div>

          <nav className="footer__nav" aria-label="Company">
            <span className="footer__nav-heading">Company</span>
            {COMPANY.map((link) => (
              <Link key={link.to} to={link.to}>{link.label}</Link>
            ))}
          </nav>

          <nav className="footer__nav" aria-label="Product">
            <span className="footer__nav-heading">Flash</span>
            {PRODUCT.map((link) => (
              <Link key={link.to} to={link.to}>{link.label}</Link>
            ))}
          </nav>

          <nav className="footer__legal" aria-label="Legal">
            <span className="footer__nav-heading">Legal</span>
            {LEGAL.map((link) => (
              <Link key={link.to} to={link.to}>{link.label}</Link>
            ))}
          </nav>
        </div>

        <div className="footer__bottom">
          <span>&copy; {new Date().getFullYear()} FLASH. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
