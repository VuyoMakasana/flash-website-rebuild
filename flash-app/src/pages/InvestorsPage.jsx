import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import InfoGrid from '../components/InfoGrid';
import { INVESTOR_OPPORTUNITY, INVESTOR_WHY_NOW, FOUNDER_QUOTE } from '../data/investorContent';
import './InvestorsPage.css';
import { usePageMeta } from '../hooks/usePageMeta';

export default function InvestorsPage() {
  usePageMeta(
    "Invest in Flash — South Africa's Same-Day Clothing Delivery Platform",
    "Flash is building South Africa's same-day clothing delivery infrastructure. We're seeking strategic investors to accelerate our growth across the continent."
  );

  return (
    <>
      <PageHeader
        crumb="Investors"
        eyebrow="For Investors"
        title="The infrastructure Africa's commerce needs."
        lede="Flash is building the same-day delivery layer that connects South Africa's clothing sellers to their customers. We're at the start of a very large opportunity — and we're looking for investors who see it too."
      />

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <a className="btn btn--primary" href="/contact">Email the Founder</a>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal className="section-eyebrow">The Opportunity</Reveal>
          <Reveal as="h2" delay={80} className="section-heading">A market waiting to be unlocked.</Reveal>
          <div style={{ marginTop: 'var(--space-14)' }}>
            <InfoGrid items={INVESTOR_OPPORTUNITY} columns={3} titleKey="value" bodyKey="body" />
          </div>
        </div>
      </section>

      <section className="section--alt">
        <div className="container">
          <Reveal className="section-eyebrow">Why Now</Reveal>
          <Reveal as="h2" delay={80} className="section-heading">The conditions have never been more aligned.</Reveal>
          <Reveal delay={140} className="section-lede" style={{ marginLeft: 0 }}>
            Smartphone penetration is at an all-time high in South Africa. E-commerce
            adoption accelerated through the pandemic. Independent sellers are looking
            for better platforms. Customers expect faster delivery than ever.
          </Reveal>
          <Reveal delay={200} className="section-lede" style={{ marginLeft: 0 }}>
            Flash exists at the intersection of all four trends — and we&rsquo;re building
            the infrastructure before a global player can.
          </Reveal>
          <div style={{ marginTop: 'var(--space-14)' }}>
            <InfoGrid items={INVESTOR_WHY_NOW} columns={3} />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal className="investor-quote">
            <p>&ldquo;{FOUNDER_QUOTE}&rdquo;</p>
            <span>— Vuyo Makasana, Founder &amp; CEO</span>
          </Reveal>
        </div>
      </section>

      <section className="section--alt">
        <div className="container">
          <Reveal className="section-eyebrow">Get in Touch</Reveal>
          <Reveal as="h2" delay={80} className="section-heading">Request the investor deck.</Reveal>
          <Reveal delay={140} className="section-lede" style={{ marginLeft: 0 }}>
            Email <a href="mailto:invest@flashdelivery.co.za" style={{ color: 'var(--flash-amber-400)' }}>invest@flashdelivery.co.za</a> and
            we&rsquo;ll send over the current deck and set up a call.
          </Reveal>
        </div>
      </section>
    </>
  );
}
