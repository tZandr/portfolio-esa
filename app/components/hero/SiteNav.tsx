import Link from "next/link";
import { site } from "../../content/projects";
import styles from "./SiteNav.module.css";

export default function SiteNav() {
  return (
    <nav className={styles.nav}>
      <Link className={styles.brand} href="/">{site.name}</Link>
      <span className={styles.links}>
        {site.nav.map((l) => (
          <a key={l.label} href={l.href} className={l.cta ? styles.cta : undefined}>
            {l.label}
          </a>
        ))}
      </span>
    </nav>
  );
}
