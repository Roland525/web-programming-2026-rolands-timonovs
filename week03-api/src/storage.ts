import type { Project } from "./types";
import { isProject } from "./guards";

const storageKey = "campusflow.week03.localProjects";

export function loadProjects(fallback: Project[]): Project[] {
  try {
    const savedText = localStorage.getItem(storageKey);
    if (!savedText) return [...fallback];

    const savedData: unknown = JSON.parse(savedText);
    if (!Array.isArray(savedData) || !savedData.every(isProject)) {
      return [...fallback];
    }
    return savedData;
  } catch {
    return [...fallback];
  }
}

export function saveProjects(projects: Project[]): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify(projects));
  } catch {
    // Ja saglabāt nevar, projekts paliek pašreizējā sarakstā.
  }
}
