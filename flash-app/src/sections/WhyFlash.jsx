import Reveal from '../components/Reveal';
import './WhyFlash.css';

const POINTS = [
  'Fashion should be accessible, not a scheduling problem.',
  'Local clothing stores deserve a faster way to reach the people already looking for them.',
  'Waiting days for something you could wear tonight doesn\u2019t make sense anymore.',
];

export default function WhyFlash() {
  return (
    <section id="story" className="why">
      <div className="container why__inner">
        <Reveal className="section-eyebrow">Why FLASH</Reveal>
        <Reveal as="h2" delay={80} className="why__statement">
          Shopping shouldn&rsquo;t mean waiting.
        </Reveal>

        <div className="why__points">
          {POINTS.map((point, i) => (
            <Reveal key={point} delay={160 + i * 90} className="why__point">
              <span className="why__index">{String(i + 1).padStart(2, '0')}</span>
              <p>{point}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
