import { useReveal } from '../hooks/useReveal';

/**
 * Wraps children in a fade/rise reveal triggered by IntersectionObserver.
 * `as` lets the caller pick the wrapping element (div, span, etc).
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'reveal--visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
