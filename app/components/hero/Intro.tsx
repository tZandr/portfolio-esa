import { site } from '../../content/projects';
import styles from './Intro.module.css';

/** Name, full name, statement, tech stack and award — shown while nothing
 *  is playing. */
export default function Intro() {
  return (
    <div className={styles.id}>
      <h1 className={styles.wordmark}>{site.name}</h1>
      <p className={styles.fullName}>{site.fullName}</p>
      <p className={styles.stack}>{site.stack}</p>

      <p className={styles.award}>{site.award}</p>
    </div>
  );
}

// <p className={styles.statement}>{site.statement}</p>
// "Sound design and implementation for games"
