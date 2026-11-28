import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import './AppDemoVideo.css';

const VIDEO_SRC = '/media/flash-app-demo.mp4';
const POSTER_SRC = '/media/flash-app-demo-poster.jpg';

/**
 * Hero visual: a hand holding an iPhone with a real screen recording of the
 * Flash app playing on it. Silent, looping, inline on iPhone. It only plays
 * while it is on screen, and stays on the still poster frame for visitors
 * who ask their device for reduced motion.
 */
export default function AppDemoVideo() {
  const videoRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    // React does not always write the `muted` attribute to the DOM, and iOS
    // Safari only autoplays videos it can see are muted, so set it directly.
    video.muted = true;
    video.defaultMuted = true;

    if (reducedMotion) {
      video.pause();
      return undefined;
    }

    const tryPlay = () => {
      const attempt = video.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
    };

    if (typeof IntersectionObserver === 'undefined') {
      tryPlay();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else video.pause();
      },
      { threshold: 0.15 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <figure className="app-demo">
      <video
        ref={videoRef}
        className="app-demo__video"
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        width="1080"
        height="1446"
        muted
        loop
        playsInline
        preload={reducedMotion ? 'none' : 'auto'}
        disablePictureInPicture
        aria-label="The Flash app on an iPhone: choosing a size, adding to cart, checking out and tracking the order"
      />
    </figure>
  );
}
