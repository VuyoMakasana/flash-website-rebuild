import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import './OrderCard.css';

/**
 * FLASH's signature UI element — a floating product card that
 * demonstrates a feature instead of describing it in prose.
 *
 * `steps`: array of { label } describing a real, plausible sequence.
 *          Note: these are common-sense delivery-flow labels, not
 *          verified backend state names — the marketing repo has no
 *          API layer to source exact enum values from. Treat as
 *          illustrative UX copy, not a literal product spec.
 * `rows`: optional array of { label, value, accent? } for data-style
 *         cards (seller/driver dashboards).
 */
export default function OrderCard({ eyebrow, pill = 'Live', title, meta, icon, steps, rows, float = true }) {
  const reduced = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(reduced && steps ? steps.length - 1 : 0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!steps || reduced) return;

    let i = 0;
    function tick() {
      setActiveIndex(i);
      i = (i + 1) % (steps.length + 1);
      const delay = i === 0 ? 1800 : 1500;
      timeoutRef.current = setTimeout(tick, delay);
    }
    tick();

    return () => clearTimeout(timeoutRef.current);
  }, [steps, reduced]);

  return (
    <div className={`order-card ${float && !reduced ? 'order-card--float' : ''}`} role="img" aria-label={meta ? `${title}, ${meta}` : title}>
      <div className="order-card__head">
        <span className="order-card__id">{eyebrow}</span>
        <span className="order-card__pill">
          <span className="order-card__pill-dot" />
          {pill}
        </span>
      </div>

      {title && (
        <div className="order-card__item">
          <div className="order-card__thumb">{icon}</div>
          <div>
            <div className="order-card__name">{title}</div>
            {meta && <div className="order-card__meta">{meta}</div>}
          </div>
        </div>
      )}

      {steps && (
        <div className="order-card__rail">
          {steps.map((step, idx) => {
            const state = idx < activeIndex ? 'is-done' : idx === activeIndex ? 'is-active' : '';
            return (
              <div className={`order-card__step ${state}`} key={step.label}>
                {idx < steps.length - 1 && <div className="order-card__step-line" />}
                <div className="order-card__step-dot" />
                <div className="order-card__step-label">{step.label}</div>
              </div>
            );
          })}
        </div>
      )}

      {rows && (
        <div>
          {rows.map((row) => (
            <div className="order-card__row" key={row.label}>
              <span className="order-card__row-label">{row.label}</span>
              <span className={`order-card__row-value ${row.accent ? 'order-card__row-value--amber' : ''}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
