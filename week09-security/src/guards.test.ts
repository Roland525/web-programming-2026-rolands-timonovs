import { expect, it } from "vitest";
import { isProject } from "./guards";

const project = {
  id: "p1", title: "Map", description: "My campus map",
  category: "Design", status: "active", dueDate: "2026-12-01", progress: 40,
};

it("accepts project data", () => {
  expect(isProject(project)).toBe(true);
});

it.each([null, [], "p1", { ...project, progress: "40" },
  { ...project, category: "Python" }, { ...project, status: "paused" },
].map((value) => ({ value })))("rejects invalid project data $value", ({ value }) => {
  expect(isProject(value)).toBe(false);
});
