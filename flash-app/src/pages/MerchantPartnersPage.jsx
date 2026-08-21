import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import StatRow from '../components/StatRow';
import InfoGrid from '../components/InfoGrid';
import InlineForm from '../components/InlineForm';
import { MERCHANT_STATS, MERCHANT_BENEFITS, MERCHANT_WHO } from '../data/merchantContent';
import { usePageMeta } from '../hooks/usePageMeta';

const CITY_OPTIONS = [{ value: 'Gqeberha', label: 'Gqeberha' }, { value: 'Other', label: 'Other city' }];

export default function MerchantPartnersPage() {
  usePageMeta(
    "Sell on Flash — Same-Day Delivery for Clothing Sellers | Port Elizabeth",
    "List your clothing on Flash and offer same-day delivery to customers in Gqeberha. We handle the logistics — you focus on selling."
  );

  return (
    <>
      <PageHeader
        crumb="Sell on Flash"
        eyebrow="Seller Partners"
        title="Sell more. Ship nothing. Grow fast."
        lede="Flash gives your clothing store same-day delivery without the complexity. We connect you to customers, assign a driver, and handle logistics — you just focus on your product."
      />

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <StatRow stats={MERCHANT_STATS} />
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal className="section-eyebrow">Why Sell on Flash</Reveal>
          <Reveal as="h2" delay={80} className="section-heading">Everything a seller needs.</Reveal>
          <div style={{ marginTop: 'var(--space-14)' }}>
            <InfoGrid items={MERCHANT_BENEFITS} columns={3} />
          </div>
        </div>
      </section>

      <section className="section--alt">
        <div className="container">
          <Reveal className="section-eyebrow">Who Can Sell on Flash</Reveal>
          <Reveal as="h2" delay={80} className="section-heading">Built for local sellers of all sizes.</Reveal>
          <Reveal delay={140} className="section-lede" style={{ marginLeft: 0 }}>
            Whether you&rsquo;re a home-based seamstress, a boutique store, or a growing
            online brand — if you sell clothing and you&rsquo;re based in Gqeberha, you can apply.
          </Reveal>
          <div style={{ marginTop: 'var(--space-14)' }}>
            <InfoGrid items={MERCHANT_WHO} columns={3} />
          </div>
        </div>
      </section>

      <section id="apply">
        <div className="container">
          <Reveal className="section-eyebrow">Apply Now</Reveal>
          <Reveal as="h2" delay={80} className="section-heading">Start your seller application.</Reveal>
          <Reveal delay={140} className="section-lede" style={{ marginLeft: 0 }}>
            Tell us about your store and we&rsquo;ll be in touch.
          </Reveal>

          <div style={{ marginTop: 'var(--space-12)' }}>
            <InlineForm
              endpoint="applications/seller"
              submitLabel="Submit Application"
              successMessage="Thanks — your seller application has been received. We'll be in touch."
              selectField="city"
              selectLabel="City"
              selectOptions={CITY_OPTIONS}
              messageLabel="About your store"
            />
          </div>
        </div>
      </section>
    </>
  );
}
