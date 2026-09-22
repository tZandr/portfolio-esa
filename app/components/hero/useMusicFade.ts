import { useCallback, useRef, type RefObject } from "react";

/** Ramps the ambient track's volume smoothly instead of snapping it on or
 *  off — a disc loading fades the music out, ejecting fades it back in.
 *  Volume, not mute: the track keeps playing underneath, so nothing has to
 *  restart. Cancels any fade already in progress, so switching discs
 *  quickly doesn't leave two ramps fighting over the same volume. */
export function useMusicFade(musicRef: RefObject<HTMLAudioElement | null>) {
  const tokenRef = useRef(0);

  const fadeTo = useCallback((target: number, duration = 620) => {
    const el = musicRef.current;
    if (!el) return;
    const token = ++tokenRef.current;
    const from = el.muted ? 0 : el.volume;
    const start = performance.now();
    if (target > 0) el.muted = false;

    const step = (now: number) => {
      if (tokenRef.current !== token) return;
      const t = Math.min(1, (now - start) / duration);
      el.volume = from + (target - from) * t;
      if (t < 1) {
        requestAnimationFrame(step);
      } else if (target === 0) {
        /* iOS ignores the volume setter entirely (hardware controls the
           real level), so muted is what actually silences it there — this
           is the fallback for that, harmless everywhere else since volume
           is already at 0 by now. */
        el.muted = true;
      }
    };
    requestAnimationFrame(step);
  }, [musicRef]);

  return fadeTo;
}
