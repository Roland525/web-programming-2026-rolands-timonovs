import ProjectSection from "../components/ProjectSection";
import type { LoadState, Project } from "../types";

interface ProjectsPageProps {
  projects: LoadState<Project[]>;
  onRetry: () => void;
  onAdd: (project: Project) => void;
}

function ProjectsPage({ projects, onRetry, onAdd }: ProjectsPageProps) {
  return (
    <>
      <title>Projects · CampusFlow</title>
      <ProjectSection projects={projects} onRetry={onRetry} onAdd={onAdd} />
    </>
  );
}

export default ProjectsPage;
