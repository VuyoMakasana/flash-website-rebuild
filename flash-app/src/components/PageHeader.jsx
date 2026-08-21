import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import './PageHeader.css';

export default function PageHeader({ crumb, eyebrow, title, lede }) {
  return (
    <header className="page-header">
      <div className="container">
        <nav className="page-header__crumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>{crumb}</span>
        </nav>

        <Reveal className="section-eyebrow">{eyebrow}</Reveal>
        <Reveal as="h1" delay={80} className="page-header__title">{title}</Reveal>
        {lede && <Reveal delay={160} className="section-lede page-header__lede">{lede}</Reveal>}
      </div>
    </header>
  );
}
