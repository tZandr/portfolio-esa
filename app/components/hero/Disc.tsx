import type { Ref } from "react";
import type { Project } from "../../content/projects";
import styles from "./Disc.module.css";

/** The record itself: poster as the label, grooves, hub. Shared by the disc
 *  in the rack and the copy that flies into the deck. The play glyph only
 *  shows for the focused disc — everywhere else, a click just brings that
 *  disc to focus rather than playing it. */
export function DiscFace({ project, focused }: { project: Project; focused: boolean }) {
  return (
    <>
      <span
        className={styles.vinyl}
        style={project.poster ? { backgroundImage: `url(${project.poster})` } : undefined}
      />
      <span className={styles.grooves} />
      <span className={styles.hub}>
        {focused ? <span className={styles.hubGlyph} /> : null}
      </span>
    </>
  );
}

type DiscProps = {
  project: Project;
  /** In the deck: the rack shows an empty socket in its place. */
  loaded: boolean;
  /** The disc centred in the rack — the only one a click actually plays. */
  focused: boolean;
  onPlay: () => void;
  /** A mouse entering this disc — the background preview picks it up. */
  onHoverStart?: () => void;
  ref?: Ref<HTMLButtonElement>;
};

export default function Disc({ project, loaded, focused, onPlay, onHoverStart, ref }: DiscProps) {
  const label = loaded
    ? `${project.title} — playing`
    : focused
    ? `Play ${project.title}`
    : `Show ${project.title}`;

  return (
    <button
      type="button"
      ref={ref}
      className={`${styles.disc} ${loaded ? styles.loaded : ""}`}
      onClick={onPlay}
      onMouseEnter={onHoverStart}
      disabled={loaded}
      aria-label={label}
    >
      <DiscFace project={project} focused={focused} />
    </button>
  );
}
