import { useState, type SubmitEvent } from "react";
import { CATEGORIES, type Project } from "../types";
import { EMPTY_FORM, validate } from "../validation";
import type { FieldName, FormErrors, FormValues } from "../validation";
import Field from "./Field";
interface AddProjectFormProps {
  disabled: boolean;
  onAdd: (project: Project) => void;
}
function AddProjectForm({ disabled, onAdd }: AddProjectFormProps) {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");
  function update(name: FieldName, value: string): void {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setMessage("");
  }
  function handleSubmit(event: SubmitEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (disabled) return;
    const result = validate(values);
    if (!result.ok) {
      setErrors(result.errors);
      setMessage("");
      return;
    }
    const project = { ...result.project, id: crypto.randomUUID() };
    onAdd(project);
    setValues(EMPTY_FORM);
    setErrors({});
    setMessage(`"${project.title}" added.`);
  }
  return (
    <div id="addProject" className="mt-6 rounded-[18px] border border-[#e5e9f2] bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="mb-2.5 text-[11px] font-extrabold tracking-[0.14em] text-[#6d5dfc]">NEW PROJECT</p>
        <h2 className="text-[28px] font-bold tracking-[-0.035em]">Add a project</h2>
      </div>
      <form id="projectForm" noValidate onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
        <Field id="projectTitle" label="Title" error={errors.title}>
          <input
            id="projectTitle"
            name="title"
            type="text"
            value={values.title}
            aria-invalid={errors.title !== undefined}
            aria-describedby="projectTitleError"
            onChange={(event) => update("title", event.target.value)}
            className="w-full rounded-xl border border-[#d5d9e6] px-3 py-2.5 text-sm outline-none focus:border-[#6d5dfc] aria-invalid:border-[#c64444]"
          />
        </Field>
        <Field id="projectCategory" label="Category" error={errors.category}>
          <select
            id="projectCategory"
            name="category"
            value={values.category}
            aria-invalid={errors.category !== undefined}
            aria-describedby="projectCategoryError"
            onChange={(event) => update("category", event.target.value)}
            className="w-full rounded-xl border border-[#d5d9e6] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6d5dfc] aria-invalid:border-[#c64444]"
          >
            <option value="">Choose…</option>
            {CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
        </Field>
        <div className="md:col-span-2">
          <Field id="projectDescription" label="Description" error={errors.description}>
            <textarea
              id="projectDescription"
              name="description"
              value={values.description}
              aria-invalid={errors.description !== undefined}
              aria-describedby="projectDescriptionError descriptionCount"
              onChange={(event) => update("description", event.target.value)}
              className="min-h-24 w-full resize-y rounded-xl border border-[#d5d9e6] px-3 py-2.5 text-sm outline-none focus:border-[#6d5dfc] aria-invalid:border-[#c64444]"
            />
          </Field>
          <p id="descriptionCount" className={`text-xs ${values.description.length > 200 ? "text-[#c64444]" : "text-[#6c7485]"}`}>
            {values.description.length}/200
          </p>
        </div>
        <Field id="projectDueDate" label="Due date" error={errors.dueDate}>
          <input
            id="projectDueDate"
            name="dueDate"
            type="date"
            value={values.dueDate}
            aria-invalid={errors.dueDate !== undefined}
            aria-describedby="projectDueDateError"
            onChange={(event) => update("dueDate", event.target.value)}
            className="w-full rounded-xl border border-[#d5d9e6] px-3 py-2.5 text-sm outline-none focus:border-[#6d5dfc] aria-invalid:border-[#c64444]"
          />
        </Field>
        <Field id="projectProgress" label="Progress (%)" error={errors.progress}>
          <input
            id="projectProgress"
            name="progress"
            type="number"
            min="0"
            max="100"
            step="1"
            value={values.progress}
            aria-invalid={errors.progress !== undefined}
            aria-describedby="projectProgressError"
            onChange={(event) => update("progress", event.target.value)}
            className="w-full rounded-xl border border-[#d5d9e6] px-3 py-2.5 text-sm outline-none focus:border-[#6d5dfc] aria-invalid:border-[#c64444]"
          />
        </Field>
        <div className="md:col-span-2">
          <button type="submit" disabled={disabled} className="inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-xl bg-[#6d5dfc] px-[18px] text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#5547df] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d5dfc] disabled:cursor-not-allowed disabled:opacity-50">
            Add project
          </button>
          <p role="status" className="mt-3 text-sm text-[#16875b]">{message}</p>
        </div>
      </form>
    </div>
  );
}
export default AddProjectForm;
