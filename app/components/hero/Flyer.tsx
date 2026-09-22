"use client";

import { useEffect, useRef } from "react";
import type { Project } from "../../content/projects";
import { DiscFace } from "./Disc";
import styles from "./Flyer.module.css";

export type Flight = {
  index: number;
  /** Rising out of the deck rather than dropping into it. */
  back: boolean;
  rect: { left: number; top: number; width: number; height: number };
  dy: number;
};

/** A copy of the disc, fixed over the original, that travels between the
 *  rack and the deck's mouth. Calls `onLanded` when it gets there. */
export default function Flyer({
  flight,
  project,
  onLanded,
}: {
  flight: Flight;
  project: Project;
  onLanded: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!el.animate) { onLanded(); return; }

    const move = [
      { transform: "translateY(0px)" },
      { transform: `translateY(${flight.dy.toFixed(1)}px)` },
    ];
    const anim = el.animate(flight.back ? [...move].reverse() : move, {
      duration: flight.back ? 620 : 660,
      easing: flight.back
        ? "cubic-bezier(.16,.7,.3,1)"
        : "cubic-bezier(.45,.05,.55,1)",
      fill: "forwards",
    });
    anim.onfinish = onLanded;
    return () => { anim.onfinish = null; };
  }, [flight, onLanded]);

  return (
    <div
      ref={ref}
      className={styles.flyer}
      style={{
        left: flight.rect.left,
        top: flight.rect.top,
        width: flight.rect.width,
        height: flight.rect.height,
      }}
      aria-hidden="true"
    >
      {/* Only the focused disc can ever fly, so the glyph always shows. */}
      <DiscFace project={project} focused />
    </div>
  );
}
