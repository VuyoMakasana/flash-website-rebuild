import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';

/**
 * FLASH global audio manager.
 *
 * Rules this exists to satisfy:
 * - Exactly one <audio> element, mounted once at the app root.
 * - Never restarts on navigation/re-render — this provider persists
 *   for the lifetime of the app, and the section components never
 *   touch the element directly.
 * - Never downloads the (~2.9MB) track up front. The element is created
 *   with preload="none" and nothing calls play() until the user presses
 *   the sound control, so visitors who never turn sound on — most of
 *   them, especially on mobile — never fetch it. Browsers block unmuted
 *   autoplay on a first visit anyway (iOS Safari, Chrome's autoplay
 *   policy, etc.), so an autoplay attempt on mount only ever cost the
 *   download. Until activation we sit in the "awaiting activation" state
 *   and expose it via `needsActivation` so the UI shows a subtle control
 *   instead of pretending it's already playing.
 * - User's mute preference is persisted to localStorage and restored
 *   on the next visit.
 * - Tab backgrounding / OS-level audio suspension is not fought —
 *   we just reflect whatever state the browser lands us in.
 */

const AudioCtx = createContext(null);
const STORAGE_KEY = 'flash-audio-muted';

export function AudioProvider({ children, src }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === null ? false : stored === 'true';
    } catch {
      return false;
    }
  });
  // Nothing plays until the user activates it; a visitor who previously
  // muted just sees the "unmute" control instead.
  const [needsActivation, setNeedsActivation] = useState(() => !isMuted);

  // Create the single audio element once.
  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    // Don't fetch the file until the first play() — see the note above.
    audio.preload = 'none';
    audio.volume = 0.35;
    audio.muted = isMuted;
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  // Keep the element's muted flag in sync and persist the preference.
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
    try {
      localStorage.setItem(STORAGE_KEY, String(isMuted));
    } catch {
      /* localStorage unavailable — preference just won't persist */
    }
  }, [isMuted]);

  const activate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setIsMuted(false);
    audio.muted = false;
    audio.play().then(() => setNeedsActivation(false)).catch(() => {});
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (needsActivation) {
      activate();
      return;
    }
    setIsMuted((prev) => {
      const next = !prev;
      if (audio && !next) {
        // Unmuting after activation already happened — make sure it's playing.
        audio.play().catch(() => {});
      }
      return next;
    });
  }, [needsActivation, activate]);

  return (
    <AudioCtx.Provider value={{ isPlaying, isMuted, needsActivation, toggleMute, activate }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
}
