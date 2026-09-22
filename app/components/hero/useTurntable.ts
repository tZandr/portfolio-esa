import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import type { Flight } from "./Flyer";
import { prefersReducedMotion } from "./motion";
import { useMusicFade } from "./useMusicFade";

type Options = {
  discRefs: RefObject<(HTMLButtonElement | null)[]>;
  mouthRef: RefObject<HTMLSpanElement | null>;
  /** The ambient track — runs continuously, fading out the moment a disc
   *  actually loads and back in once the hero goes back to idle, so it's
   *  never stopped and restarted (which would reset it to the start). */
  musicRef: RefObject<HTMLAudioElement | null>;
  /** Bring disc `i` to rest over the slot before it drops. */
  settle: (i: number) => Promise<void>;
};

/** Which disc is in the deck, and the load / eject sequence that gets it
 *  there. The flight itself is animated by <Flyer>, which calls `land`.
 *
 *  Two states, not one: `docked` is the disc physically in the deck right
 *  now — it genuinely passes through `null` mid-switch, while the old disc
 *  is flying back out and the new one hasn't dropped in yet. `display` is
 *  what the rest of the hero (intro, now-playing, scrim) shows, and it only
 *  goes idle on a real eject — switching straight from one disc to another
 *  never touches it, so the hero doesn't flash back to idle in between. */
export function useTurntable({ discRefs, mouthRef, musicRef, settle }: Options) {
  const [docked, setDocked] = useState<number | null>(null);
  const [display, setDisplay] = useState<number | null>(null);
  const [flight, setFlight] = useState<Flight | null>(null);

  const busyRef = useRef(false);
  const doneRef = useRef<(() => void) | null>(null);
  const fadeMusic = useMusicFade(musicRef);

  /* ── the drop: straight down at full size, no scale, no rotation.
        The deck's apron covers it once it passes the seam. ── */
  const fly = useCallback((index: number, back: boolean) => {
    const btn = discRefs.current[index];
    const mouth = mouthRef.current;
    if (!btn || !mouth || prefersReducedMotion()) return Promise.resolve();

    const from = btn.getBoundingClientRect();
    const to = mouth.getBoundingClientRect();
    const dy = to.top + to.height / 2 - from.top + 8;

    return new Promise<void>((resolve) => {
      doneRef.current = resolve;
      setFlight({
        index,
        back,
        rect: { left: from.left, top: from.top, width: from.width, height: from.height },
        dy,
      });
    });
  }, [discRefs, mouthRef]);

  const land = useCallback(() => {
    setFlight(null);
    doneRef.current?.();
    doneRef.current = null;
  }, []);

  const eject = useCallback(async (keepOpen = false) => {
    const i = docked;
    if (i === null) return;
    busyRef.current = true;

    /* The disc rises while the layout is still in its playing state, so it
       lands exactly on the socket it left. Only then does the deck close —
       and only when this isn't the first half of a switch to another disc. */
    await fly(i, true);
    setDocked(null);
    if (!keepOpen) {
      setDisplay(null);
      fadeMusic(1);
    }
    busyRef.current = false;
  }, [docked, fly, fadeMusic]);

  const load = useCallback(async (i: number) => {
    busyRef.current = true;
    await settle(i);
    /* Flip the rack slot to its empty-socket look, and the hero over to its
       playing state, the instant the disc leaves the rack — in step with
       the flying copy, otherwise both the solid rack disc and the solid
       flyer are on screen at once. */
    setDocked(i);
    setDisplay(i);
    fadeMusic(0);
    await fly(i, false);
    busyRef.current = false;
  }, [settle, fly, fadeMusic]);

  const toggle = useCallback(async (i: number) => {
    if (busyRef.current) return;
    if (docked === i) { await eject(); return; }
    if (docked !== null) { await eject(true); }
    await load(i);
  }, [docked, eject, load]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && docked !== null) eject();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [docked, eject]);

  return { docked, display, flight, toggle, eject, land };
}
