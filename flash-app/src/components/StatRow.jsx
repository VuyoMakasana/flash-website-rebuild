import Reveal from './Reveal';
import './StatRow.css';

export default function StatRow({ stats }) {
  return (
    <div className="stat-row">
      {stats.map((stat, i) => (
        <Reveal key={stat.value} delay={i * 70} className="stat-row__item">
          <span className="stat-row__value">{stat.value}</span>
          <span className="stat-row__label">{stat.label}</span>
        </Reveal>
      ))}
    </div>
  );
}
