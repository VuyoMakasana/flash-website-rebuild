import Reveal from '../components/Reveal';
import './Delivery.css';

const STEPS = [
  'Order confirmed',
  'Seller preparing',
  'Driver collected',
  'In transit',
  'Delivered',
];

export default function Delivery() {
  return (
    <section id="delivery" className="delivery">
      <div className="container delivery__inner">
        <Reveal className="section-eyebrow">Same-Day Delivery</Reveal>
        <Reveal as="h2" delay={80} className="section-heading delivery__heading">
          Ordered this morning.
          <br />Worn tonight.
        </Reveal>

        <div className="delivery__timeline">
          {STEPS.map((step, i) => (
            <Reveal key={step} delay={140 + i * 90} className="delivery__step">
              <span className="delivery__step-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="delivery__step-label">{step}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
