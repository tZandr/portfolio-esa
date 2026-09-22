import type { Ref } from "react";
import type { Project } from "../../content/projects";
import { site } from "../../content/projects";
import Preview from "./Preview";
import styles from "./Background.module.css";

/** The blurred preview behind everything before a disc is loaded, the
 *  playing project's video faded in over it, the ambient track that runs
 *  until something is actually clicked, and the scrim that keeps the type
 *  readable. */
export default function Background({
  active,
  preview,
  musicRef,
}: {
  active: Project | null;
  /** The hovered-or-centred project, shown blurred while idle. */
  preview: Project | null;
  musicRef: Ref<HTMLAudioElement>;
}) {
  return (
    <>
      <div className={styles.bg}>
        {!active && preview ? <Preview project={preview} /> : null}

        <div className={`${styles.project} ${active ? styles.projectOn : ""}`}>
          {active ? <ProjectPlayer project={active} /> : null}
        </div>
      </div>

      {/* Runs continuously once started — fades out the instant a disc
          loads, back in once the hero goes back to idle, never stopped, so
          it never restarts from the top. Silent until a real click has
          given the browser a reason to let audio play at all. */}
      {site.music.src ? (
        <audio ref={musicRef} src={site.music.src} loop preload="auto" />
      ) : null}

      <div className={styles.scrim} />
    </>
  );
}

function ProjectPlayer({ project }: { project: Project }) {
  if (!project.video) {
    /* eslint-disable-next-line @next/next/no-img-element */
    return <img className={styles.player} src={project.poster} alt={project.title} />;
  }

  /* Built only on click — six players fetched up front would make this a
     slow page, and a slow page at a fair is a dead page. A click is a user
     gesture, so this may play with sound. */
  return (
    <video
      key={project.video}
      className={styles.player}
      src={project.video}
      poster={project.poster}
      controls
      autoPlay
      playsInline
    />
  );
}
