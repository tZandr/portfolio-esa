import { site } from "../../content/projects";
import styles from "./NowListening.module.css";

/** The ambient track's title, just under the header, with a small
 *  equalizer in place of a "now playing" label. Hidden once a disc
 *  actually takes over. */
export default function NowListening() {
  if (!site.music.title) return null;
  return (
    <p className={styles.label}>
      <span className={styles.bars} aria-hidden="true">
        <span /><span /><span />
      </span>
      {site.music.title}
    </p>
  );
}
