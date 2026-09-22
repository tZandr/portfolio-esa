import type { Project } from "../../content/projects";
import styles from "./Preview.module.css";

/** What plays behind everything before a disc is actually loaded: the
 *  hovered — or, with no mouse, centred — project's clip, blurred and
 *  silent so it reads as atmosphere rather than content. The music track
 *  carries the actual sound until something is clicked. */
export default function Preview({ project }: { project: Project }) {
  if (!project.video) {
    /* eslint-disable-next-line @next/next/no-img-element */
    return <img key={project.poster} className={styles.clip} src={project.poster} alt="" aria-hidden="true" />;
  }

  return (
    <video
      key={project.video}
      className={styles.clip}
      src={project.video}
      muted
      autoPlay
      loop
      playsInline
      aria-hidden="true"
    />
  );
}
