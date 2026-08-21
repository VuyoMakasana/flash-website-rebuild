import Reveal from '../components/Reveal';
import { IconGarment, IconClock } from '../components/icons';
import './Shopping.css';

const SIZES = ['S', 'M', 'L', 'XL'];

export default function Shopping() {
  return (
    <section id="shop" className="shopping">
      <div className="container shopping__grid">
        <Reveal className="shopping__copy">
          <span className="section-eyebrow">Shopping On FLASH</span>
          <h2 className="section-heading">
            Local clothing.
            <br />One app.
          </h2>
          <p className="section-lede">
            Browse pieces from clothing sellers around Gqeberha, see what&rsquo;s
            actually available today, and check out in a few taps.
          </p>
        </Reveal>

        <Reveal delay={160} className="product-card">
          <div className="product-card__image" aria-hidden="true">
            <IconGarment width="44" height="44" />
          </div>
          <div className="product-card__body">
            <span className="product-card__brand">Local Seller</span>
            <h3 className="product-card__title">Oversized Essential Tee</h3>
            <div className="product-card__price">R 799</div>

            <div className="product-card__sizes" role="group" aria-label="Available sizes">
              {SIZES.map((size, i) => (
                <span className={`product-card__size ${i === 1 ? 'is-selected' : ''}`} key={size}>
                  {size}
                </span>
              ))}
            </div>

            <div className="product-card__delivery">
              <IconClock width="14" height="14" aria-hidden="true" />
              Deliver Today
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
