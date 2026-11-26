import type { Project, ProjectFilter } from "./types";

export function filterProjects(projects: readonly Project[], filter: ProjectFilter): Project[] {
  if (filter === "all") return [...projects];
  return projects.filter((project) => project.status === filter);
}
