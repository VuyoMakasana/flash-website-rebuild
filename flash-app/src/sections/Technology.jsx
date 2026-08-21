import Reveal from '../components/Reveal';
import { IconBag, IconStore, IconDriver } from '../components/icons';
import './Technology.css';

const NODES = [
  { label: 'Customers', icon: IconBag },
  { label: 'Stores', icon: IconStore },
  { label: 'Drivers', icon: IconDriver },
];

export default function Technology() {
  return (
    <section id="technology" className="tech">
      <div className="container tech__inner">
        <Reveal className="section-eyebrow">The Platform</Reveal>
        <Reveal as="h2" delay={80} className="section-heading tech__heading">
          Not a courier company.
          <br />A delivery platform.
        </Reveal>
        <Reveal delay={140} className="section-lede tech__lede">
          FLASH is the infrastructure connecting three groups of people who
          all benefit from same-day delivery existing in Gqeberha.
        </Reveal>

        <div className="tech__diagram">
          <Reveal delay={220} className="tech__hub">FLASH</Reveal>
          <div className="tech__nodes">
            {NODES.map((node, i) => {
              const Icon = node.icon;
              return (
                <Reveal key={node.label} delay={320 + i * 90} className="tech__node">
                  <div className="tech__connector" aria-hidden="true" />
                  <div className="tech__node-badge">
                    <Icon width="20" height="20" aria-hidden="true" />
                  </div>
                  <span>{node.label}</span>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
