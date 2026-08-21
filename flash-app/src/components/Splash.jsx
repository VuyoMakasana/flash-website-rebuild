import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import './Splash.css';

const WORD = 'FLASH';

export default function Splash({ onDone }) {
  const reduced = usePrefersReducedMotion();
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Reduced motion: short, simple fade — no letter choreography.
    const holdMs = reduced ? 500 : 1500;
    const leaveMs = reduced ? 300 : 700;

    const holdTimer = setTimeout(() => setLeaving(true), holdMs);
    const goneTimer = setTimeout(() => {
      setGone(true);
      onDone?.();
    }, holdMs + leaveMs);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(goneTimer);
    };
  }, [reduced, onDone]);

  if (gone) return null;

  return (
    <div
      className={`splash ${leaving ? 'splash--leaving' : ''} ${reduced ? 'splash--reduced' : ''}`}
      role="presentation"
      aria-hidden="true"
    >
      <div className="splash__word">
        {reduced ? (
          <span className="splash__letter" style={{ opacity: 1 }}>{WORD}</span>
        ) : (
          WORD.split('').map((letter, i) => (
            <span
              key={i}
              className="splash__letter"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              {letter}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
