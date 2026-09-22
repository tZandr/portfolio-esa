"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import type { Project } from "../../content/projects";
import Disc from "./Disc";
import styles from "./Rack.module.css";

type RackProps = {
  projects: Project[];
  loaded: number | null;
  /** The disc centred in the rack — the only one a click plays outright. */
  focused: number;
  rackRef: RefObject<HTMLDivElement | null>;
  discRefs: RefObject<(HTMLButtonElement | null)[]>;
  /** A disc was clicked — plays it if focused, otherwise just brings it
   *  into focus. */
  onSelect: (i: number) => void;
  onStep: (delta: number) => void;
  /** A disc gained the mouse (index), or the rack lost it entirely (null). */
  onHoverChange: (i: number | null) => void;
  onEject: () => void;
};

export default function Rack({
  projects, loaded, focused, rackRef, discRefs, onSelect, onStep, onHoverChange, onEject,
}: RackProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [markTop, setMarkTop] = useState(0);

  /* "Now playing" sits level with the empty socket. It keeps its last
     position after an eject so it fades out where it was. */
  const placeMark = useCallback(() => {
    if (loaded === null) return;
    const btn = discRefs.current[loaded];
    const wrap = wrapRef.current;
    if (!btn || !wrap) return;
    const r = btn.getBoundingClientRect();
    const w = wrap.getBoundingClientRect();
    setMarkTop(r.top - w.top + r.height / 2);
  }, [loaded, discRefs]);

  useLayoutEffect(placeMark, [placeMark]);

  useEffect(() => {
    window.addEventListener("resize", placeMark);
    return () => window.removeEventListener("resize", placeMark);
  }, [placeMark]);

  return (
    <div className={styles.rackWrap} ref={wrapRef}>
      {/* Sits right over the empty socket, so ejecting reads as putting the
          disc back where it came from. */}
      <button
        type="button"
        className={styles.mark}
        style={{ top: markTop }}
        onClick={onEject}
        aria-label="Eject"
      >
        ⏏
      </button>

      <StepButton direction="prev" onClick={() => onStep(-1)} />

      <div
        className={styles.rack}
        ref={rackRef}
        role="list"
        aria-label="Selected work"
        onMouseLeave={() => onHoverChange(null)}
      >
        {projects.map((p, i) => (
          <div className={styles.slot} role="listitem" key={p.title}>
            <Disc
              project={p}
              loaded={loaded === i}
              focused={focused === i}
              onPlay={() => onSelect(i)}
              onHoverStart={() => onHoverChange(i)}
              ref={(el) => { discRefs.current[i] = el; }}
            />
            <span className={styles.cap}>
              <span className={styles.capTitle}>{p.title}</span>
              <span className={styles.capMeta}>{p.meta}</span>
            </span>
          </div>
        ))}
      </div>

      <StepButton direction="next" onClick={() => onStep(1)} />
    </div>
  );
}

function StepButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  const prev = direction === "prev";
  return (
    <button
      className={`${styles.arrow} ${prev ? styles.arrowL : styles.arrowR}`}
      type="button"
      onClick={onClick}
      aria-label={prev ? "Previous" : "Next"}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        <path
          d={prev ? "M7.5 1.5 L3 6 L7.5 10.5" : "M4.5 1.5 L9 6 L4.5 10.5"}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    </button>
  );
}
