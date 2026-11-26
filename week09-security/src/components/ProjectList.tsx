import type { LoadState, Project, ProjectFilter } from "../types";
import { filterProjects } from "../projectFilter";
import ProjectCard from "./ProjectCard";
import { EmptyBox, ErrorBox, LoadingBox } from "./StateBox";
interface ProjectListProps {
  state: LoadState<Project[]>;
  filter: ProjectFilter;
  onRetry: () => void;
}
function ProjectList({ state, filter, onRetry }: ProjectListProps) {
  if (state.status === "loading") return <LoadingBox text="Loading projects…" />;
  if (state.status === "error") return <ErrorBox message={state.message} onRetry={onRetry} />;
  const visible = filterProjects(state.data, filter);
  if (visible.length === 0) {
    return <EmptyBox title="No projects found" text="There are no projects in this list." />;
  }
  return visible.map((project) => <ProjectCard key={project.id} project={project} />);
}
export default ProjectList;
