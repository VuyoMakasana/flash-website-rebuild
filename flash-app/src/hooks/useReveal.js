import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Returns a ref to attach to an element and a boolean that flips to
 * true once the element enters the viewport. Mirrors the existing
 * static site's IntersectionObserver reveal system so the two
 * codebases share the same motion behavior.
 *
 * Under prefers-reduced-motion, `visible` is true immediately —
 * content is never gated behind motion.
 */
export function useReveal(options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = options;
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, threshold, rootMargin]);

  return [ref, visible];
}
