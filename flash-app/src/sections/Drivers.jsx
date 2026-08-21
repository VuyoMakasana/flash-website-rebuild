import Reveal from '../components/Reveal';
import OrderCard from '../components/OrderCard';
import { IconDriver } from '../components/icons';
import './PartnerSection.css';

export default function Drivers() {
  return (
    <section id="drivers" className="partner partner--reverse">
      <div className="container partner__grid">
        <Reveal delay={160} className="partner__visual">
          <OrderCard
            eyebrow="Driver App"
            pill="Nearby Order"
            title="Pickup 1.2 km away"
            meta="Walmer &rarr; Summerstrand"
            icon={<IconDriver width="20" height="20" />}
            rows={[
              { label: 'Deliveries today', value: '7' },
              { label: 'Availability', value: 'Online' },
              { label: "Today's earnings", value: 'R 860', accent: true },
            ]}
          />
        </Reveal>

        <Reveal className="partner__copy">
          <span className="section-eyebrow">For Drivers</span>
          <h2 className="section-heading">Move fashion.<br />Make it happen.</h2>
          <p className="section-lede">
            Deliver on your own schedule. Accept nearby pickups, see your
            route, and track what you&rsquo;ve earned as you go.
          </p>
          <div className="partner__cta">
            <a className="btn btn--primary" href="/drivers">Drive With FLASH</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
