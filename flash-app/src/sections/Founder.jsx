import Reveal from '../components/Reveal';
import founder480 from '../assets/founder/vuyo-makasana-480.webp';
import founder900 from '../assets/founder/vuyo-makasana-900.webp';
import founder1600 from '../assets/founder/vuyo-makasana-1600.webp';
import founderFallback from '../assets/founder/vuyo-makasana-900.jpg';
import './Founder.css';

export default function Founder() {
  return (
    <section id="founder" className="founder">
      <div className="founder__grid">
        <Reveal className="founder__image-wrap">
          <img
            className="founder__image"
            src={founder900}
            srcSet={`${founder480} 480w, ${founder900} 900w, ${founder1600} 1600w`}
            sizes="(min-width: 900px) 45vw, 100vw"
            alt="Vuyo Makasana, Founder and CEO of FLASH"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = founderFallback; }}
          />
        </Reveal>

        <div className="founder__copy">
          <Reveal className="section-eyebrow">The Person Behind FLASH</Reveal>
          <Reveal as="h2" delay={100} className="founder__name">
            Vuyo Makasana
          </Reveal>
          <Reveal delay={180} className="founder__title">
            Founder &amp; CEO, FLASH
          </Reveal>
          <Reveal delay={260} className="founder__bio">
            A self-taught developer building FLASH from Gqeberha, Port
            Elizabeth &mdash; putting same-day clothing delivery within reach
            of local sellers, drivers and customers.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
