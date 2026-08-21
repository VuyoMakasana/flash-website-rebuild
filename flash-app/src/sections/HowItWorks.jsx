import Reveal from '../components/Reveal';
import { IconSearch, IconBag, IconDriver, IconPin } from '../components/icons';
import { HOW_IT_WORKS_STEPS } from '../data/content';
import './HowItWorks.css';

const ICONS = {
  discover: IconSearch,
  order: IconBag,
  driver: IconDriver,
  delivery: IconPin,
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how">
      <div className="container">
        <Reveal className="section-eyebrow">How FLASH Works</Reveal>
        <Reveal as="h2" delay={80} className="section-heading">
          From local store to your door. Today.
        </Reveal>

        <div className="how__flow" aria-hidden="true">
          {['Seller', 'Flash Driver', 'Your Door'].map((label, i) => (
            <div className="how__flow-node" key={label}>
              <div className="how__flow-content">
                {i === 0 && <IconSearch width="18" height="18" />}
                {i === 1 && <IconDriver width="18" height="18" />}
                {i === 2 && <IconPin width="18" height="18" />}
                <span>{label}</span>
              </div>
              {i < 2 && <div className="how__flow-line" />}
            </div>
          ))}
        </div>

        <div className="how__grid">
          {HOW_IT_WORKS_STEPS.map((step, i) => {
            const Icon = ICONS[step.key];
            return (
              <Reveal key={step.key} delay={i * 90} className="how__card">
                <span className="how__card-num">{String(i + 1).padStart(2, '0')}</span>
                <Icon width="22" height="22" className="how__card-icon" aria-hidden="true" />
                <h3 className="how__card-title">{step.label}</h3>
                <p className="how__card-copy">{step.copy}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
