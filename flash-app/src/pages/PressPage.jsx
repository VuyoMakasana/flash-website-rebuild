import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { PRESS_FACTS, PRESS_BOILERPLATE } from '../data/pressContent';
import './PressPage.css';
import { usePageMeta } from '../hooks/usePageMeta';

export default function PressPage() {
  usePageMeta(
    "Press — Flash Same-Day Clothing Delivery | Port Elizabeth",
    "Press information, company facts, and media contacts for Flash — South Africa's same-day clothing delivery platform."
  );

  return (
    <>
      <PageHeader
        crumb="Press"
        eyebrow="Media"
        title="Press & Media."
        lede="For all press enquiries, interview requests, and photography needs, contact our media team. We respond to press within 24 hours."
      />

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <a className="btn btn--primary" href="mailto:press@flashdelivery.co.za">press@flashdelivery.co.za</a>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal className="section-eyebrow">Company Facts</Reveal>
          <div className="press-facts">
            {PRESS_FACTS.map((fact, i) => (
              <Reveal key={fact.label} delay={i * 60} className="press-facts__row">
                <span className="press-facts__label">{fact.label}</span>
                <span className="press-facts__value">{fact.value}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section--alt">
        <div className="container">
          <Reveal className="section-eyebrow">Boilerplate</Reveal>
          <Reveal delay={80} className="section-lede" style={{ marginLeft: 0, fontSize: 'var(--text-lg)', maxWidth: '44rem' }}>
            {PRESS_BOILERPLATE}
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal className="section-eyebrow">Media Contact</Reveal>
          <Reveal as="h2" delay={80} className="section-heading">
            For interview requests, comment, photography, and all media enquiries.
          </Reveal>
          <Reveal delay={140} style={{ marginTop: 'var(--space-6)' }}>
            <a className="btn btn--primary" href="mailto:press@flashdelivery.co.za">press@flashdelivery.co.za</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
