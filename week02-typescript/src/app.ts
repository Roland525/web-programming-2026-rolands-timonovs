import type { Project, ProjectFilter } from "./types";

export function filterProjects(projects: Project[], filter: ProjectFilter): Project[] {
  if (filter === "all") return projects;
  return projects.filter((project) => project.status === filter);
}

export function isProjectFilter(value: string | undefined): value is ProjectFilter {
  return value === "all" || value === "active" || value === "done";
}

export function setupNavigation(
  menuButton: HTMLButtonElement | null,
  mainNav: HTMLElement | null,
): void {
  if (!menuButton || !mainNav) return;

  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.contains("hidden");
    mainNav.classList.toggle("hidden", !isOpen);
    mainNav.classList.toggle("flex", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}
