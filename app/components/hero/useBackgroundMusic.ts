import { useEffect, type RefObject } from "react";

/** Tries to start the ambient track as soon as it mounts; browsers block
 *  audible autoplay without a real gesture behind it, so if that first
 *  attempt is refused, every click or keypress on the page retries it —
 *  not just the first one, since that attempt can itself fail (the media
 *  still buffering, say) and there's no way to tell in advance which
 *  gesture will be the one that actually unlocks it. */
export function useBackgroundMusic(musicRef: RefObject<HTMLAudioElement | null>) {
  useEffect(() => {
    const el = musicRef.current;
    if (!el) return;

    let unlocked = false;
    const tryPlay = () => {
      el.play().then(() => {
        unlocked = true;
        window.removeEventListener("pointerdown", onGesture);
        window.removeEventListener("keydown", onGesture);
      }).catch(() => {});
    };
    tryPlay();

    const onGesture = () => {
      if (!unlocked) tryPlay();
    };
    window.addEventListener("pointerdown", onGesture);
    window.addEventListener("keydown", onGesture);
    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
  }, [musicRef]);
}
