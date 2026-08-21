import Reveal from '../components/Reveal';
import OrderCard from '../components/OrderCard';
import { IconBolt, IconPin, IconGarment } from '../components/icons';
import './Hero.css';

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__glow hero__glow--amber" aria-hidden="true" />
      <div className="hero__glow hero__glow--dim" aria-hidden="true" />

      <div className="container hero__grid">
        <div className="hero__copy">
          <Reveal className="section-eyebrow">
            <IconBolt width="12" height="12" aria-hidden="true" />
            Coming soon to Gqeberha
          </Reveal>

          <Reveal as="h1" delay={80} className="hero__title">
            Fashion doesn&rsquo;t wait.
          </Reveal>

          <Reveal delay={200} className="hero__sub">
            FLASH connects you with local clothing sellers and same-day drivers
            in Gqeberha, Port Elizabeth. Order this morning, wear it tonight.
          </Reveal>

          <Reveal delay={320} className="hero__cta-row">
            <a className="btn btn--primary btn--lg" href="#waitlist">Get Early Access</a>
            <a className="btn btn--ghost" href="#story">See how it works</a>
          </Reveal>

          <Reveal delay={420} className="hero__location">
            <IconPin width="15" height="15" aria-hidden="true" />
            Port Elizabeth, South Africa
          </Reveal>
        </div>

        <Reveal delay={260} className="hero__visual">
          <OrderCard
            eyebrow="Order #FL-2048"
            pill="Live"
            title="Denim Jacket · Local Seller"
            meta="Newton Park, Gqeberha"
            icon={<IconGarment aria-hidden="true" />}
            steps={[
              { label: 'Order confirmed' },
              { label: 'Seller preparing' },
              { label: 'Driver collected' },
              { label: 'Delivered' },
            ]}
          />
        </Reveal>
      </div>
    </section>
  );
}
