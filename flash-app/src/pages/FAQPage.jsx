import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { IconChevron } from '../components/icons';
import { FAQ_SECTIONS } from '../data/faqContent';
import '../sections/FAQ.css';
import { usePageMeta } from '../hooks/usePageMeta';

export default function FAQPage() {
  usePageMeta(
    "FAQ — Flash Same-Day Clothing Delivery | Port Elizabeth",
    "Frequently asked questions about Flash — how same-day clothing delivery works, how to join as a seller or driver, payment, tracking, and more."
  );

  const [openKey, setOpenKey] = useState(null);

  return (
    <>
      <PageHeader
        crumb="FAQ"
        eyebrow="Support"
        title="Frequently asked questions."
        lede={<>Can&rsquo;t find what you&rsquo;re looking for? <a href="/contact" style={{ color: 'var(--flash-amber-400)' }}>Contact us directly</a> — we respond within one business day.</>}
      />

      <section style={{ paddingTop: 0 }}>
        <div className="container faq__inner" style={{ maxWidth: '48rem' }}>
          {FAQ_SECTIONS.map((section, catIndex) => (
            <div key={section.category} style={{ marginBottom: 'var(--space-14)' }}>
              <Reveal className="section-eyebrow">{section.category}</Reveal>
              <div className="faq__list">
                {section.items.map((item, i) => {
                  const key = `${catIndex}-${i}`;
                  const isOpen = openKey === key;
                  return (
                    <Reveal key={item.q} delay={i * 40} className="faq__item">
                      <button
                        type="button"
                        className="faq__question"
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${key}`}
                        onClick={() => setOpenKey(isOpen ? null : key)}
                      >
                        {item.q}
                        <IconChevron className={`faq__chevron ${isOpen ? 'is-open' : ''}`} width="18" height="18" aria-hidden="true" />
                      </button>
                      <div id={`faq-panel-${key}`} className={`faq__answer ${isOpen ? 'is-open' : ''}`} role="region">
                        <p>{item.a}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
