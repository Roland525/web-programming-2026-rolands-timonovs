import { describe, expect, test } from "vitest";
import { createProject, validateProject } from "./form";

describe("validateProject", () => {
  test("returns errors for invalid values", () => {
    const errors = validateProject({
      title: "ab",
      description: "short",
      category: "",
      dueDate: "",
      progress: "20.5",
    });

    expect(errors.title).toBeTruthy();
    expect(errors.description).toBeTruthy();
    expect(errors.category).toBeTruthy();
    expect(errors.dueDate).toBeTruthy();
    expect(errors.progress).toBeTruthy();
  });

  test("accepts correct values", () => {
    const errors = validateProject({
      title: "New project",
      description: "A long enough description",
      category: "Design",
      dueDate: "2026-10-20",
      progress: "80",
    });

    expect(errors).toEqual({});
  });
});

describe("createProject", () => {
  test("sets done status when progress is 100", () => {
    const project = createProject({
      title: "Finished project",
      description: "This project is finished",
      category: "Frontend",
      dueDate: "2026-10-20",
      progress: "100",
    });

    expect(project.status).toBe("done");
    expect(project.progress).toBe(100);
  });
});
