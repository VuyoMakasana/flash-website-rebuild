import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import InfoGrid from '../components/InfoGrid';
import { CAREERS_VALUES, CAREERS_ROLES } from '../data/careersContent';
import './CareersPage.css';
import { usePageMeta } from '../hooks/usePageMeta';

export default function CareersPage() {
  usePageMeta(
    "Careers at Flash — Join the Team | Port Elizabeth, South Africa",
    "Join Flash and help build South Africa's same-day clothing delivery platform. We're looking for curious, driven people who want to do meaningful work."
  );

  return (
    <>
      <PageHeader
        crumb="Careers"
        eyebrow="Join the Team"
        title="Build something that matters."
        lede="Flash is a small team building big infrastructure. If you want your work to have immediate, visible impact — and you're energised by solving real problems in a real market — we'd love to meet you."
      />

      <section>
        <div className="container">
          <Reveal className="section-eyebrow">What We Value</Reveal>
          <Reveal as="h2" delay={80} className="section-heading">How we work.</Reveal>
          <div style={{ marginTop: 'var(--space-14)' }}>
            <InfoGrid items={CAREERS_VALUES} columns={3} />
          </div>
        </div>
      </section>

      <section className="section--alt">
        <div className="container">
          <Reveal className="section-eyebrow">Open Roles</Reveal>
          <Reveal as="h2" delay={80} className="section-heading">Current openings.</Reveal>
          <Reveal delay={140} className="section-lede" style={{ marginLeft: 0 }}>
            Flash is early-stage, so our roles are broad and high-impact. If you don&rsquo;t
            see an exact match, apply anyway — we hire for potential as much as experience.
          </Reveal>

          <div className="careers-roles">
            {CAREERS_ROLES.map((role, i) => (
              <Reveal key={role.title} delay={200 + i * 60} className="careers-roles__item">
                <div>
                  <h3>{role.title}</h3>
                  <span>{role.meta}</span>
                </div>
                <a className="btn btn--ghost" href="/contact">Apply</a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal className="section-eyebrow">Don&rsquo;t See Your Role?</Reveal>
          <Reveal as="h2" delay={80} className="section-heading">Send a speculative application.</Reveal>
          <Reveal delay={140} className="section-lede" style={{ marginLeft: 0 }}>
            Tell us what you&rsquo;d build and why Flash is the right place for you.
          </Reveal>
          <Reveal delay={200} style={{ marginTop: 'var(--space-8)' }}>
            <a className="btn btn--primary" href="/contact">Send a Speculative Application</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
