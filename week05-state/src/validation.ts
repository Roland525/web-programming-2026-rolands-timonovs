import type { Category } from "./types";

export interface FormValues {
  title: string;
  description: string;
  category: string;
  dueDate: string;
  progress: string;
}

export type FieldName = keyof FormValues;
export type FormErrors = Partial<Record<FieldName, string>>;

export const CATEGORIES: Category[] = ["Frontend", "API", "JavaScript", "Design"];

export const EMPTY_FORM: FormValues = {
  title: "",
  description: "",
  category: "",
  dueDate: "",
  progress: "",
};
