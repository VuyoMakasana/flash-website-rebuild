import Reveal from '../components/Reveal';
import OrderCard from '../components/OrderCard';
import { IconBolt } from '../components/icons';
import './PartnerSection.css';

export default function Stores() {
  return (
    <section id="stores" className="partner">
      <div className="container partner__grid">
        <Reveal className="partner__copy">
          <span className="section-eyebrow">For Stores</span>
          <h2 className="section-heading">Your store.<br />Delivered today.</h2>
          <p className="section-lede">
            Reach customers who want their order the same day, without
            building delivery infrastructure yourself. FLASH handles pickup,
            routing and delivery — you focus on the clothes.
          </p>
          <div className="partner__cta">
            <a className="btn btn--primary" href="/stores">Partner With FLASH</a>
          </div>
        </Reveal>

        <Reveal delay={160} className="partner__visual">
          <OrderCard
            eyebrow="Seller Dashboard"
            pill="New Order"
            title="Order alert received"
            meta="Just now · Ready for pickup"
            icon={<IconBolt width="20" height="20" />}
            rows={[
              { label: 'Orders this week', value: '18' },
              { label: 'Commission', value: 'Flat rate' },
              { label: "This week's payout", value: 'R 4,120', accent: true },
            ]}
          />
        </Reveal>
      </div>
    </section>
  );
}
