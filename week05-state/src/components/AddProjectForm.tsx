import { useState } from "react";
import type { Project } from "../types";
import { CATEGORIES, EMPTY_FORM } from "../validation";
import type { FieldName, FormValues } from "../validation";
import Field from "./Field";

interface AddProjectFormProps {
  disabled: boolean;
  onAdd: (project: Project) => void;
}

function AddProjectForm({ disabled }: AddProjectFormProps) {
  const [values, setValues] = useState<FormValues>(EMPTY_FORM);

  function update(name: FieldName, value: string): void {
    setValues((current) => ({ ...current, [name]: value }));
  }

  return (
    <div id="addProject" className="mt-6 rounded-[18px] border border-[#e5e9f2] bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="mb-2.5 text-[11px] font-extrabold tracking-[0.14em] text-[#6d5dfc]">NEW PROJECT</p>
        <h2 className="text-[28px] font-bold tracking-[-0.035em]">Add a project</h2>
      </div>
      <form id="projectForm" noValidate onSubmit={(event) => event.preventDefault()} className="grid gap-5 md:grid-cols-2">
        <Field id="projectTitle" label="Title">
          <input
            id="projectTitle"
            name="title"
            type="text"
            value={values.title}
            onChange={(event) => update("title", event.target.value)}
            className="w-full rounded-xl border border-[#d5d9e6] px-3 py-2.5 text-sm outline-none focus:border-[#6d5dfc] aria-invalid:border-[#c64444]"
          />
        </Field>
        <Field id="projectCategory" label="Category">
          <select
            id="projectCategory"
            name="category"
            value={values.category}
            onChange={(event) => update("category", event.target.value)}
            className="w-full rounded-xl border border-[#d5d9e6] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#6d5dfc] aria-invalid:border-[#c64444]"
          >
            <option value="">Choose…</option>
            {CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
        </Field>
        <div className="md:col-span-2">
          <Field id="projectDescription" label="Description">
            <textarea
              id="projectDescription"
              name="description"
              value={values.description}
              onChange={(event) => update("description", event.target.value)}
              className="min-h-24 w-full resize-y rounded-xl border border-[#d5d9e6] px-3 py-2.5 text-sm outline-none focus:border-[#6d5dfc] aria-invalid:border-[#c64444]"
            />
          </Field>
        </div>
        <Field id="projectDueDate" label="Due date">
          <input
            id="projectDueDate"
            name="dueDate"
            type="date"
            value={values.dueDate}
            onChange={(event) => update("dueDate", event.target.value)}
            className="w-full rounded-xl border border-[#d5d9e6] px-3 py-2.5 text-sm outline-none focus:border-[#6d5dfc] aria-invalid:border-[#c64444]"
          />
        </Field>
        <Field id="projectProgress" label="Progress (%)">
          <input
            id="projectProgress"
            name="progress"
            type="number"
            min="0"
            max="100"
            step="1"
            value={values.progress}
            onChange={(event) => update("progress", event.target.value)}
            className="w-full rounded-xl border border-[#d5d9e6] px-3 py-2.5 text-sm outline-none focus:border-[#6d5dfc] aria-invalid:border-[#c64444]"
          />
        </Field>
        <div className="md:col-span-2">
          <button type="submit" disabled={disabled} className="inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-xl bg-[#6d5dfc] px-[18px] text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#5547df] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d5dfc] disabled:cursor-not-allowed disabled:opacity-50">
            Add project
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProjectForm;
