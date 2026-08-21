import { useState } from 'react';
import Reveal from '../components/Reveal';
import { IconChevron } from '../components/icons';
import { FAQ_ITEMS } from '../data/content';
import './FAQ.css';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="faq">
      <div className="container faq__inner">
        <Reveal className="section-eyebrow">Questions</Reveal>
        <Reveal as="h2" delay={80} className="section-heading">Frequently asked.</Reveal>

        <div className="faq__list">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.q} delay={140 + i * 60} className="faq__item">
                <button
                  type="button"
                  className="faq__question"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  {item.q}
                  <IconChevron className={`faq__chevron ${isOpen ? 'is-open' : ''}`} width="18" height="18" aria-hidden="true" />
                </button>
                <div
                  id={`faq-panel-${i}`}
                  className={`faq__answer ${isOpen ? 'is-open' : ''}`}
                  role="region"
                >
                  <p>{item.a}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
