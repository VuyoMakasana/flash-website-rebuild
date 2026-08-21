import Reveal from './Reveal';
import './InfoGrid.css';

export default function InfoGrid({ items, columns = 3, titleKey = 'title', bodyKey = 'body' }) {
  return (
    <div className="info-grid" style={{ '--info-grid-cols': columns }}>
      {items.map((item, i) => (
        <Reveal key={item[titleKey]} delay={i * 80} className="info-grid__card">
          <h3 className="info-grid__title">{item[titleKey]}</h3>
          <p className="info-grid__body">{item[bodyKey]}</p>
        </Reveal>
      ))}
    </div>
  );
}
