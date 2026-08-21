import { useAudio } from '../context/AudioContext';
import './AudioControl.css';

export default function AudioControl() {
  const { isMuted, needsActivation, toggleMute } = useAudio();
  const label = needsActivation ? 'Turn on sound' : isMuted ? 'Unmute sound' : 'Mute sound';
  const showAsOn = !isMuted && !needsActivation;

  return (
    <button
      type="button"
      className="audio-control"
      onClick={toggleMute}
      aria-pressed={showAsOn}
      aria-label={label}
      title={label}
    >
      <span className="audio-control__bars" data-active={showAsOn}>
        <span></span><span></span><span></span>
      </span>
    </button>
  );
}
