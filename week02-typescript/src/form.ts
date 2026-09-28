import type { Category, Project } from "./types";

export interface ProjectFormValues {
  title: string;
  description: string;
  category: string;
  dueDate: string;
  progress: string;
}

export type FormErrors = Partial<Record<keyof ProjectFormValues, string>>;

export function isCategory(value: string): value is Category {
  return value === "Frontend"
    || value === "API"
    || value === "JavaScript"
    || value === "Design";
}

export function validateProject(values: ProjectFormValues): FormErrors {
  const errors: FormErrors = {};
  const progress = Number(values.progress);

  if (values.title.trim().length < 3) {
    errors.title = "Title must have at least 3 characters";
  }

  if (values.description.trim().length < 10) {
    errors.description = "Description must have at least 10 characters";
  }

  if (!isCategory(values.category)) {
    errors.category = "Choose a category";
  }

  if (!values.dueDate) {
    errors.dueDate = "Choose a due date";
  }

  if (!Number.isInteger(progress) || progress < 0 || progress > 100) {
    errors.progress = "Progress must be a whole number from 0 to 100";
  }

  return errors;
}

export function createProject(values: ProjectFormValues): Project {
  if (!isCategory(values.category)) {
    throw new Error("Invalid project category");
  }

  const progress = Number(values.progress);

  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: values.title.trim(),
    description: values.description.trim(),
    category: values.category,
    status: progress === 100 ? "done" : "active",
    dueDate: values.dueDate,
    progress,
  };
}
