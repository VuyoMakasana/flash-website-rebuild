import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { HOW_IT_WORKS_TRACKS } from '../data/howItWorksContent';
import './HowItWorksPage.css';
import { usePageMeta } from '../hooks/usePageMeta';

export default function HowItWorksPage() {
  usePageMeta(
    "How Flash Works — Same-Day Clothing Delivery | Port Elizabeth",
    "See exactly how Flash delivers clothing from local sellers to your door the same day. Browse, order, track, receive — all in the Flash app."
  );

  return (
    <>
      <PageHeader
        crumb="How It Works"
        eyebrow="The Process"
        title="Ordered this morning. Delivered by tonight."
        lede="Flash coordinates three parties in real time — customer, seller, and driver — so same-day clothing delivery actually works."
      />

      {HOW_IT_WORKS_TRACKS.map((track, trackIndex) => (
        <section key={track.id} id={track.id} className={trackIndex % 2 === 1 ? 'section--alt' : ''}>
          <div className="container">
            <Reveal className="section-eyebrow">{track.label}</Reveal>
            <Reveal as="h2" delay={80} className="section-heading">{track.tagline}</Reveal>

            <div className="track__steps">
              {track.steps.map((step, i) => (
                <Reveal key={step.title} delay={140 + i * 80} className="track__step">
                  <span className="track__step-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="track__step-title">{step.title}</h3>
                  <p className="track__step-body">{step.body}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={460} className="track__cta">
              <a className="btn btn--primary" href={track.cta.href}>{track.cta.label}</a>
            </Reveal>
          </div>
        </section>
      ))}
    </>
  );
}
