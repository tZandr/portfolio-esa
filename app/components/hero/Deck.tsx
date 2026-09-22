import type { Ref } from "react";
import styles from "./Deck.module.css";

/** The deck face along the bottom edge. `mouthRef` is the slot discs drop
 *  into; the apron below the seam hides them once they pass it. */
export default function Deck({ mouthRef }: { mouthRef: Ref<HTMLSpanElement> }) {
  return (
    <div className={styles.deck}>
      <span className={styles.apron} />
      <span className={styles.seam} />
      <span className={`${styles.tick} ${styles.tickL}`} />
      <span className={styles.mouth} ref={mouthRef} />
      <span className={`${styles.tick} ${styles.tickR}`} />
    </div>
  );
}
