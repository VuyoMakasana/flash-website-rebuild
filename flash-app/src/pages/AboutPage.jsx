import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import StatRow from '../components/StatRow';
import InfoGrid from '../components/InfoGrid';
import Founder from '../sections/Founder';
import { ABOUT_STATS, ABOUT_PRINCIPLES } from '../data/aboutContent';
import { usePageMeta } from '../hooks/usePageMeta';

export default function AboutPage() {
  usePageMeta(
    "About Flash — Same-Day Clothing Delivery | Port Elizabeth, South Africa",
    "Flash is a same-day clothing delivery platform connecting local sellers, independent drivers, and customers in Gqeberha, Port Elizabeth."
  );

  return (
    <>
      <PageHeader
        crumb="About"
        eyebrow="Our Story"
        title="Built for South Africa. Built to last."
        lede="Flash is a same-day clothing delivery platform founded in Gqeberha, Port Elizabeth. We exist to solve a problem unique to South Africa — brilliant local sellers with no fast, reliable way to reach their customers."
      />

      <section>
        <div className="container">
          <Reveal className="section-eyebrow">The Problem We Solve</Reveal>
          <Reveal as="h2" delay={80} className="section-heading">
            Local sellers. Loyal customers. No fast bridge between them.
          </Reveal>
          <Reveal delay={140} className="section-lede" style={{ marginLeft: 0 }}>
            South Africa&rsquo;s clothing retail market is enormous — but the infrastructure
            connecting independent sellers to buyers has never caught up. Couriers are slow.
            Drop-offs are unreliable. Customers wait days for items they want today.
          </Reveal>
          <Reveal delay={200} className="section-lede" style={{ marginLeft: 0 }}>
            Flash was built to close that gap. By connecting vetted local sellers,
            independent drivers, and customers in a single coordinated platform, we make
            same-day delivery not just possible — but the new standard.
          </Reveal>

          <StatRow stats={ABOUT_STATS} />
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal className="section-eyebrow">Mission</Reveal>
          <Reveal as="h2" delay={80} className="section-heading">
            To make same-day delivery the default — not the exception.
          </Reveal>
          <Reveal delay={140} className="section-lede" style={{ marginLeft: 0 }}>
            Every South African deserves access to their city&rsquo;s best clothing sellers,
            on demand. Flash is the infrastructure that makes that possible.
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal className="section-eyebrow">Pan-African Vision</Reveal>
          <Reveal delay={80} className="section-lede" style={{ marginLeft: 0, fontSize: 'var(--text-lg)' }}>
            South Africa is our launchpad. Our model — same-day hyperlocal delivery built
            on three interconnected stakeholders — is designed from the ground up to
            replicate across other African markets where e-commerce is growing but
            delivery infrastructure remains fractured.
          </Reveal>
        </div>
      </section>

      <Founder />

      <section>
        <div className="container">
          <Reveal className="section-eyebrow">What We Stand For</Reveal>
          <Reveal as="h2" delay={80} className="section-heading">Our principles.</Reveal>
          <div style={{ marginTop: 'var(--space-14)' }}>
            <InfoGrid items={ABOUT_PRINCIPLES} columns={3} />
          </div>
        </div>
      </section>
    </>
  );
}
