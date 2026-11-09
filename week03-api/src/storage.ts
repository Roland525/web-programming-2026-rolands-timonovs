import type { Project } from "./types";
import { isProject } from "./guards";

const storageKey = "campusflow.week03.localProjects";

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
