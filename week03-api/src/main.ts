import "./style.css";

import { fetchDeadlines, fetchProjects, fetchWeather } from "./api";
import { createProject, validateProject } from "./form";
import type { FormErrors, ProjectFormValues } from "./form";
import { renderDeadlines, renderProjects, renderWeather } from "./render";
import { loadProjects, saveProjects } from "./storage";
import type { CurrentWeather, Deadline, LoadState, Project, ProjectFilter } from "./types";

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

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error) return `${fallback} ${error.message}`;
  return fallback;
}

const projectGrid = document.querySelector<HTMLElement>("#projectGrid");
const deadlineList = document.querySelector<HTMLElement>("#deadlineList");
const menuButton = document.querySelector<HTMLButtonElement>("#menuButton");
const mainNav = document.querySelector<HTMLElement>("#mainNav");
const filterButtons = document.querySelectorAll<HTMLButtonElement>(".filter-button");
const activeProjectCount = document.querySelector<HTMLElement>("#activeProjectCount");
const weatherValue = document.querySelector<HTMLElement>("#weatherValue");
const weatherDetails = document.querySelector<HTMLElement>("#weatherDetails");
const projectForm = document.querySelector<HTMLFormElement>("#projectForm");
const addProjectButton = projectForm?.querySelector<HTMLButtonElement>('button[type="submit"]') ?? null;
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
let apiProjects: Project[] = [];
let localProjects = loadProjects([]);
let projectState: LoadState<Project[]> = { status: "loading" };
let deadlineState: LoadState<Deadline[]> = { status: "loading" };
let weatherState: LoadState<CurrentWeather> = { status: "loading" };

function updateProjectSection(): void {
  if (projectGrid) {
    if (projectState.status === "success") {
      const visibleProjects = filterProjects(projectState.data, selectedFilter);
      renderProjects(
        projectGrid,
        { status: "success", data: visibleProjects },
        loadProjectData,
      );
    } else {
      renderProjects(projectGrid, projectState, loadProjectData);
    }
  }

  if (activeProjectCount) {
    if (projectState.status === "loading") activeProjectCount.textContent = "â€¦";
    if (projectState.status === "error") activeProjectCount.textContent = "â€“";
    if (projectState.status === "success") {
      const activeProjects = projectState.data.filter((project) => project.status === "active");
      activeProjectCount.textContent = String(activeProjects.length);
    }
  }

  if (addProjectButton) {
    addProjectButton.disabled = projectState.status !== "success";
  }
}

function updateDeadlineSection(): void {
  if (!deadlineList) return;
  renderDeadlines(deadlineList, deadlineState, loadDeadlineData);
}

function updateWeatherCard(): void {
  if (!weatherValue || !weatherDetails) return;
  renderWeather(weatherValue, weatherDetails, weatherState);
}

async function loadProjectData(): Promise<void> {
  projectState = { status: "loading" };
  updateProjectSection();

  try {
    apiProjects = await fetchProjects();
    projectState = {
      status: "success",
      data: [...apiProjects, ...localProjects],
    };
  } catch (error: unknown) {
    projectState = {
      status: "error",
      message: getErrorMessage(error, "Could not load projects."),
    };
  }

  updateProjectSection();
}

async function loadDeadlineData(): Promise<void> {
  deadlineState = { status: "loading" };
  updateDeadlineSection();

  try {
    const deadlines = await fetchDeadlines();
    deadlineState = { status: "success", data: deadlines };
  } catch (error: unknown) {
    deadlineState = {
      status: "error",
      message: getErrorMessage(error, "Could not load deadlines."),
    };
  }

  updateDeadlineSection();
}

async function loadWeatherData(): Promise<void> {
  weatherState = { status: "loading" };
  updateWeatherCard();

  try {
    const weather = await fetchWeather();
    weatherState = { status: "success", data: weather };
  } catch {
    weatherState = { status: "error", message: "Weather unavailable" };
  }

  updateWeatherCard();
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

setupNavigation(menuButton, mainNav);
updateProjectSection();
updateDeadlineSection();
updateWeatherCard();
void loadProjectData();
void loadDeadlineData();
void loadWeatherData();

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    if (!isProjectFilter(filter)) return;

    selectedFilter = filter;
    updateFilterButtons();
    updateProjectSection();
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
    if (projectState.status !== "success") return;

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

    localProjects.push(createProject(values));
    saveProjects(localProjects);
    projectState = {
      status: "success",
      data: [...apiProjects, ...localProjects],
    };
    selectedFilter = "all";
    updateFilterButtons();
    updateProjectSection();
    projectForm.reset();
    showFormErrors({});
  });
}
