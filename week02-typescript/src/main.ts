import "./style.css";

import { deadlines, startingProjects } from "./data";
import { createProject, validateProject } from "./form";
import type { FormErrors, ProjectFormValues } from "./form";
import { renderDeadlines, renderProjects } from "./render";
import { loadProjects, saveProjects } from "./storage";
import type { Project, ProjectFilter } from "./types";

function filterProjects(projects: Project[], filter: ProjectFilter): Project[] {
  if (filter === "all") return projects;
  return projects.filter((project) => project.status === filter);
}

function isProjectFilter(value: string | undefined): value is ProjectFilter {
  return value === "all" || value === "active" || value === "done";
}

function setupNavigation(
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

const projectGrid = document.querySelector<HTMLElement>("#projectGrid");
const deadlineList = document.querySelector<HTMLElement>("#deadlineList");
const menuButton = document.querySelector<HTMLButtonElement>("#menuButton");
const mainNav = document.querySelector<HTMLElement>("#mainNav");
const filterButtons = document.querySelectorAll<HTMLButtonElement>(".filter-button");
const activeProjectCount = document.querySelector<HTMLElement>("#activeProjectCount");
const projectForm = document.querySelector<HTMLFormElement>("#projectForm");
const titleInput = document.querySelector<HTMLInputElement>("#projectTitle");
const descriptionInput = document.querySelector<HTMLTextAreaElement>("#projectDescription");
const categoryInput = document.querySelector<HTMLSelectElement>("#projectCategory");
const dueDateInput = document.querySelector<HTMLInputElement>("#projectDueDate");
const progressInput = document.querySelector<HTMLInputElement>("#projectProgress");
const titleError = document.querySelector<HTMLElement>('[data-error="title"]');
const descriptionError = document.querySelector<HTMLElement>('[data-error="description"]');
const categoryError = document.querySelector<HTMLElement>('[data-error="category"]');
const dueDateError = document.querySelector<HTMLElement>('[data-error="dueDate"]');
const progressError = document.querySelector<HTMLElement>('[data-error="progress"]');

let selectedFilter: ProjectFilter = "all";
let projects = loadProjects(localStorage, startingProjects);

function updateProjects(): void {
  if (!projectGrid) return;
  const visibleProjects = filterProjects(projects, selectedFilter);
  renderProjects(projectGrid, visibleProjects);
}

function updateActiveProjectCount(): void {
  if (!activeProjectCount) return;
  const activeProjects = projects.filter((project) => project.status === "active");
  activeProjectCount.textContent = String(activeProjects.length);
}

function updateFilterButtons(): void {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === selectedFilter;
    button.classList.toggle("bg-slate-100", isActive);
    button.classList.toggle("text-[#172033]", isActive);
    button.classList.toggle("text-[#6c7485]", !isActive);
  });
}

function showFormErrors(errors: FormErrors): void {
  if (titleError) titleError.textContent = errors.title ?? "";
  if (descriptionError) descriptionError.textContent = errors.description ?? "";
  if (categoryError) categoryError.textContent = errors.category ?? "";
  if (dueDateError) dueDateError.textContent = errors.dueDate ?? "";
  if (progressError) progressError.textContent = errors.progress ?? "";
}

updateProjects();
updateActiveProjectCount();

if (deadlineList) {
  renderDeadlines(deadlineList, deadlines);
}

setupNavigation(menuButton, mainNav);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    if (!isProjectFilter(filter)) return;

    selectedFilter = filter;
    updateFilterButtons();
    updateProjects();
  });
});

if (
  projectForm
  && titleInput
  && descriptionInput
  && categoryInput
  && dueDateInput
  && progressInput
) {
  projectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const values: ProjectFormValues = {
      title: titleInput.value,
      description: descriptionInput.value,
      category: categoryInput.value,
      dueDate: dueDateInput.value,
      progress: progressInput.value,
    };
    const errors = validateProject(values);
    showFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    projects.push(createProject(values));
    saveProjects(localStorage, projects);
    selectedFilter = "all";
    updateFilterButtons();
    updateProjects();
    updateActiveProjectCount();
    projectForm.reset();
    showFormErrors({});
  });
}
