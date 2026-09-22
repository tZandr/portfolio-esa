"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import type { Project } from "../../content/projects";
import Background from "./Background";
import Deck from "./Deck";
import Flyer from "./Flyer";
import NowListening from "./NowListening";
import NowPlaying from "./NowPlaying";
import Rack from "./Rack";
import { useBackgroundMusic } from "./useBackgroundMusic";
import { useRack } from "./useRack";
import { useTurntable } from "./useTurntable";
import styles from "./Hero.module.css";

type HeroStageProps = {
  projects: Project[];
  /** Static parts, rendered on the server and slotted in. */
  nav: ReactNode;
  intro: ReactNode;
};

/** The interactive part of the hero. `data-playing` on the section is what
 *  every child stylesheet keys its playing state off. */
export default function HeroStage({ projects, nav, intro }: HeroStageProps) {
  const mouthRef = useRef<HTMLSpanElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);

  const { rackRef, discRefs, settle, step, center } = useRack(projects.length);
  const { docked, display, flight, toggle, eject, land } = useTurntable({
    discRefs,
    mouthRef,
    musicRef,
    settle,
  });
  useBackgroundMusic(musicRef);

  /* The mouse hovering a disc wins; with no mouse (or nothing hovered),
     whichever disc sits centred in the rack stands in for it. */
  const [hovered, setHovered] = useState<number | null>(null);
  const previewIndex = hovered ?? center;

  const active = display === null ? null : projects[display];
  const preview = display === null ? (projects[previewIndex] ?? null) : null;

  /* A click only plays the disc already centred in the rack — clicking any
     other one just brings it to centre, same as the arrow buttons would. */
  const selectDisc = useCallback((i: number) => {
    if (i === center) toggle(i);
    else settle(i);
  }, [center, toggle, settle]);

  return (
    <section className={styles.hero} data-playing={display !== null}>
      <Background active={active} preview={preview} musicRef={musicRef} />

      {/* Centred on the hero's full height — not just the band between nav
          and rack — so it isn't pulled up by how much room those take. */}
      <div className={styles.idLayer}>{intro}</div>

      {nav}
      <NowListening />

      <div className={styles.mid}>
        <NowPlaying project={active} />
      </div>

      <Rack
        projects={projects}
        loaded={docked}
        focused={center}
        rackRef={rackRef}
        discRefs={discRefs}
        onSelect={selectDisc}
        onStep={step}
        onHoverChange={setHovered}
        onEject={() => eject()}
      />

      <Deck mouthRef={mouthRef} />

      {flight ? (
        <Flyer flight={flight} project={projects[flight.index]} onLanded={land} />
      ) : null}
    </section>
  );
}
