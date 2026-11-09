import type { Project } from "./types";

const storageKey = "campusflow-projects";

export function isProject(value: unknown): value is Project {
  if (typeof value !== "object" || value === null) return false;

  const project = value as Project;

  return typeof project.id === "string"
    && typeof project.title === "string"
    && typeof project.description === "string"
    && ["Frontend", "API", "JavaScript", "Design"].includes(project.category)
    && ["active", "done"].includes(project.status)
    && typeof project.dueDate === "string"
    && typeof project.progress === "number"
    && Number.isInteger(project.progress)
    && project.progress >= 0
    && project.progress <= 100;
}

export function loadProjects(storage: Storage, fallback: Project[]): Project[] {
  const savedText = storage.getItem(storageKey);
  if (!savedText) return [...fallback];

  try {
    const savedData: unknown = JSON.parse(savedText);
    if (!Array.isArray(savedData) || !savedData.every(isProject)) {
      return [...fallback];
    }
    return savedData;
  } catch {
    return [...fallback];
  }
}

export function saveProjects(storage: Storage, projects: Project[]): void {
  storage.setItem(storageKey, JSON.stringify(projects));
}
