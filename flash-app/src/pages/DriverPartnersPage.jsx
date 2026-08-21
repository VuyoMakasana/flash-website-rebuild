import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import StatRow from '../components/StatRow';
import InfoGrid from '../components/InfoGrid';
import InlineForm from '../components/InlineForm';
import { DRIVER_STATS, DRIVER_BENEFITS, DRIVER_REQUIREMENTS } from '../data/driverContent';
import { usePageMeta } from '../hooks/usePageMeta';

const CITY_OPTIONS = [{ value: 'Gqeberha', label: 'Gqeberha' }, { value: 'Other', label: 'Other city' }];

export default function DriverPartnersPage() {
  usePageMeta(
    "Drive with Flash — Earn Delivering Clothing | Port Elizabeth",
    "Earn income on your own schedule by delivering clothing orders for Flash. Join our driver network in Gqeberha, Port Elizabeth."
  );

  return (
    <>
      <PageHeader
        crumb="Drive with Flash"
        eyebrow="Driver Partners"
        title="Your car. Your hours. Real income."
        lede="Flash drivers earn money delivering clothing orders in Gqeberha — no fixed schedule, no minimum hours, no boss. Just you, the road, and real earnings."
      />

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <StatRow stats={DRIVER_STATS} />
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal className="section-eyebrow">Why Drive with Flash</Reveal>
          <Reveal as="h2" delay={80} className="section-heading">Built around your life.</Reveal>
          <div style={{ marginTop: 'var(--space-14)' }}>
            <InfoGrid items={DRIVER_BENEFITS} columns={3} />
          </div>
        </div>
      </section>

      <section className="section--alt">
        <div className="container">
          <Reveal className="section-eyebrow">Requirements</Reveal>
          <Reveal as="h2" delay={80} className="section-heading">What you need to get started.</Reveal>
          <Reveal delay={140} className="section-lede" style={{ marginLeft: 0 }}>
            Flash driver requirements are straightforward. If you have a vehicle and a
            valid licence, you&rsquo;re most of the way there.
          </Reveal>
          <div style={{ marginTop: 'var(--space-14)' }}>
            <InfoGrid items={DRIVER_REQUIREMENTS} columns={3} />
          </div>
        </div>
      </section>

      <section id="apply">
        <div className="container">
          <Reveal className="section-eyebrow">Apply Now</Reveal>
          <Reveal as="h2" delay={80} className="section-heading">Start your driver application.</Reveal>
          <Reveal delay={140} className="section-lede" style={{ marginLeft: 0 }}>
            Fill in your details and we&rsquo;ll be in touch.
          </Reveal>

          <div style={{ marginTop: 'var(--space-12)' }}>
            <InlineForm
              endpoint="applications/driver"
              submitLabel="Submit Application"
              successMessage="Thanks — your driver application has been received. We'll be in touch."
              selectField="city"
              selectLabel="City"
              selectOptions={CITY_OPTIONS}
              messageLabel="Vehicle type & any questions"
            />
          </div>
        </div>
      </section>
    </>
  );
}
