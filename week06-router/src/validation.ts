import { CATEGORIES, type Category, type Project } from "./types";

export interface FormValues {
  title: string;
  description: string;
  category: string;
  dueDate: string;
  progress: string;
}

export type FieldName = keyof FormValues;
export type FormErrors = Partial<Record<FieldName, string>>;

export const EMPTY_FORM: FormValues = {
  title: "",
  description: "",
  category: "",
  dueDate: "",
  progress: "",
};

export type ValidationResult =
  | { ok: true; project: Project }
  | { ok: false; errors: FormErrors };

function isCategory(value: string): value is Category {
  return CATEGORIES.some((category) => category === value);
}

export function validate(values: FormValues): ValidationResult {
  const errors: FormErrors = {};
  const title = values.title.trim();
  const description = values.description.trim();
  const progress = Number(values.progress);

  if (title.length < 3) {
    errors.title = "Title must have at least 3 characters";
  }
  if (description.length < 10 || values.description.length > 200) {
    errors.description = "Description must have 10 to 200 characters";
  }
  if (!isCategory(values.category)) {
    errors.category = "Choose a category";
  }
  if (values.dueDate.trim() === "") {
    errors.dueDate = "Choose a due date";
  }
  if (values.progress.trim() === "" || !Number.isInteger(progress) || progress < 0 || progress > 100) {
    errors.progress = "Progress must be a whole number from 0 to 100";
  }

  if (Object.keys(errors).length > 0 || !isCategory(values.category)) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    project: {
      id: "", // The form adds an id when the project is submitted.
      title,
      description,
      category: values.category,
      status: progress === 100 ? "done" : "active",
      dueDate: values.dueDate,
      progress,
    },
  };
}
