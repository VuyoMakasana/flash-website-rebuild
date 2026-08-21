import Reveal from '../components/Reveal';
import './PortElizabeth.css';

export default function PortElizabeth() {
  return (
    <section id="origin" className="origin">
      <div className="container origin__inner">
        <Reveal className="origin__line">Born in</Reveal>
        <Reveal delay={100} as="h2" className="origin__city">Port Elizabeth.</Reveal>
        <Reveal delay={200} className="origin__line">Built for what&rsquo;s next.</Reveal>

        <Reveal delay={320} className="origin__meta">
          <span>Gqeberha, South Africa</span>
          <span className="origin__dot" aria-hidden="true" />
          <span>Coming Soon</span>
        </Reveal>
      </div>
    </section>
  );
}
