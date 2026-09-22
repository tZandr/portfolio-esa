import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./motion";

/** Scroll position of the disc rack: centring, arrow stepping, waiting for
 *  a scroll to come to rest, and which disc currently sits centred — the
 *  touch equivalent of a hover, used for the background preview. */
export function useRack(count: number) {
  const rackRef = useRef<HTMLDivElement>(null);
  const discRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const focusRef = useRef(0);
  const [center, setCenter] = useState(0);

  const measureCenter = useCallback(() => {
    const rack = rackRef.current;
    if (!rack) return;
    const mid = rack.getBoundingClientRect().left + rack.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    discRefs.current.forEach((btn, i) => {
      if (!btn) return;
      const dist = Math.abs(btn.getBoundingClientRect().left + btn.offsetWidth / 2 - mid);
      if (dist < bestDist) { bestDist = dist; best = i; }
    });
    setCenter(best);
  }, []);

  useEffect(() => {
    measureCenter();
    const rack = rackRef.current;
    if (!rack) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measureCenter);
    };
    rack.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      rack.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [measureCenter, count]);

  const centreOn = useCallback((i: number) => {
    const rack = rackRef.current;
    const slot = discRefs.current[i]?.parentElement;
    if (!rack || !slot) return;
    rack.scrollTo({
      left: slot.offsetLeft + slot.offsetWidth / 2 - rack.clientWidth / 2,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  /* The disc must be sitting over the slot before it can drop into it, so
     wait for the snap to finish rather than guessing at a delay. */
  const settle = useCallback((i: number) => {
    focusRef.current = i;
    centreOn(i);
    if (prefersReducedMotion()) return Promise.resolve();
    return new Promise<void>((resolve) => {
      const rack = rackRef.current;
      if (!rack) return resolve();
      let last = -1;
      let tries = 0;
      const check = () => {
        if (rack.scrollLeft === last || tries++ > 26) return resolve();
        last = rack.scrollLeft;
        setTimeout(check, 40);
      };
      check();
    });
  }, [centreOn]);

  const step = useCallback((delta: number) => {
    const next = Math.min(count - 1, Math.max(0, focusRef.current + delta));
    focusRef.current = next;
    centreOn(next);
  }, [count, centreOn]);

  return { rackRef, discRefs, settle, step, center };
}
