import type { Deadline, Project } from "./types";

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isProject(value: unknown): value is Project {
  if (!isRecord(value)) return false;

  const categoryIsValid = value.category === "Frontend"
    || value.category === "API"
    || value.category === "JavaScript"
    || value.category === "Design";
  const statusIsValid = value.status === "active" || value.status === "done";

  return typeof value.id === "string"
    && typeof value.title === "string"
    && typeof value.description === "string"
    && categoryIsValid
    && statusIsValid
    && typeof value.dueDate === "string"
    && typeof value.progress === "number"
    && Number.isInteger(value.progress)
    && value.progress >= 0
    && value.progress <= 100;
}

export function isDeadline(value: unknown): value is Deadline {
  if (!isRecord(value)) return false;

  return typeof value.title === "string"
    && typeof value.course === "string"
    && typeof value.date === "string"
    && typeof value.time === "string";
}

export function isProjectList(value: unknown): value is Project[] {
  return Array.isArray(value) && value.every(isProject);
}
