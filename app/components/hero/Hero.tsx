import type { Project } from "../../content/projects";
import HeroStage from "./HeroStage";
import Intro from "./Intro";
import SiteNav from "./SiteNav";

/* The nav and intro never change, so they stay Server Components and are
   handed to the client-side stage as slots instead of being bundled into it. */
export default function Hero({ projects }: { projects: Project[] }) {
  return <HeroStage projects={projects} nav={<SiteNav />} intro={<Intro />} />;
}
