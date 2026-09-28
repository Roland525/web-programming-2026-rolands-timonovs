import "./style.css";

import { filterProjects, isProjectFilter, setupNavigation } from "./app";
import { deadlines, startingProjects } from "./data";
import { createProject, validateProject } from "./form";
import type { FormErrors, ProjectFormValues } from "./form";
import { renderDeadlines, renderProjects } from "./render";
import { loadProjects, saveProjects } from "./storage";
import type { ProjectFilter } from "./types";

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

let selectedFilter: ProjectFilter = "all";
let projects = loadProjects(localStorage, startingProjects);

const formFields: (keyof ProjectFormValues)[] = [
  "title",
  "description",
  "category",
  "dueDate",
  "progress",
];

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
  formFields.forEach((field) => {
    const message = document.querySelector<HTMLElement>(`[data-error="${field}"]`);
    if (message) message.textContent = errors[field] ?? "";
  });
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
