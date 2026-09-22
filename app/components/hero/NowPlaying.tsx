import type { Project } from "../../content/projects";
import styles from "./NowPlaying.module.css";

/** Details of the loaded project. Always rendered (empty when idle) so it
 *  can cross-fade with the intro in the same grid cell. There's no eject
 *  control here — clicking the loaded disc again, or Escape, ejects it. */
export default function NowPlaying({ project }: { project: Project | null }) {
  return (
    <div className={styles.now}>
      <p className={styles.nowTitle}>{project?.title ?? ""}</p>
      <p className={styles.nowMeta}>{project?.meta ?? ""}</p>
      <p className={styles.nowNote}>{project?.note ?? ""}</p>
    </div>
  );
}
