import { expect, it } from "vitest";
import { validate, type FormValues } from "./validation";

const form: FormValues = {
  title: "Portfolio",
  description: "My first site",
  category: "Frontend",
  dueDate: "2026-12-01",
  progress: "40",
};

it("creates an active project with numeric progress", () => {
  const result = validate(form);
  expect(result.ok).toBe(true);
  if (!result.ok) return;
  expect(result.project.progress).toBe(40);
  expect(result.project.status).toBe("active");
});

it("rejects a two-letter title", () => {
  expect(validate({ ...form, title: "ab" })).toEqual({
    ok: false, errors: { title: "Title must have at least 3 characters" },
  });
});

it("accepts a three-letter title", () => {
  expect(validate({ ...form, title: "Map" }).ok).toBe(true);
});

it("marks a finished project as done", () => {
  expect(validate({ ...form, progress: "100" })).toMatchObject({
    ok: true, project: { status: "done" },
  });
});

it("rejects a description with 201 characters", () => {
  expect(validate({ ...form, description: "x".repeat(201) })).toMatchObject({
    ok: false, errors: { description: "Description must have 10 to 200 characters" },
  });
});

it("rejects an unknown category", () => {
  expect(validate({ ...form, category: "Python" })).toMatchObject({
    ok: false, errors: { category: "Choose a category" },
  });
});

it.each(["", "-1", "101", "50.5", "abc"])("rejects invalid progress %j", (progress) => {
  expect(validate({ ...form, progress })).toMatchObject({
    ok: false, errors: { progress: "Progress must be a whole number from 0 to 100" },
  });
});
