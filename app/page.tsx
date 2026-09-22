import Hero from "./components/hero/Hero";
import { projects } from "./content/projects";

export default function Home() {
  return <Hero projects={projects} />;
}
