import "./style.css";

import { filterProjects, isProjectFilter, setupNavigation } from "./app";
import { deadlines, startingProjects } from "./data";
import { renderDeadlines, renderProjects } from "./render";
import type { ProjectFilter } from "./types";

const projectGrid = document.querySelector<HTMLElement>("#projectGrid");
const deadlineList = document.querySelector<HTMLElement>("#deadlineList");
const menuButton = document.querySelector<HTMLButtonElement>("#menuButton");
const mainNav = document.querySelector<HTMLElement>("#mainNav");
const filterButtons = document.querySelectorAll<HTMLButtonElement>(".filter-button");
const activeProjectCount = document.querySelector<HTMLElement>("#activeProjectCount");

let selectedFilter: ProjectFilter = "all";

function updateProjects(): void {
  if (!projectGrid) return;
  const visibleProjects = filterProjects(startingProjects, selectedFilter);
  renderProjects(projectGrid, visibleProjects);
}

updateProjects();

if (deadlineList) {
  renderDeadlines(deadlineList, deadlines);
}

if (activeProjectCount) {
  const activeProjects = startingProjects.filter((project) => project.status === "active");
  activeProjectCount.textContent = String(activeProjects.length);
}

setupNavigation(menuButton, mainNav);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    if (!isProjectFilter(filter)) return;

    selectedFilter = filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("bg-slate-100", isActive);
      item.classList.toggle("text-[#172033]", isActive);
      item.classList.toggle("text-[#6c7485]", !isActive);
    });

    updateProjects();
  });
});
