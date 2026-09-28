// @vitest-environment jsdom

import { describe, expect, test } from "vitest";
import { renderDeadlines, renderProjects } from "./render";
import type { Deadline, Project } from "./types";

const testProject: Project = {
  id: "test-1",
  title: "<b>test</b>",
  description: "A simple test description",
  category: "Frontend",
  status: "active",
  dueDate: "2026-10-10",
  progress: 50,
};

describe("renderProjects", () => {
  test("shows the project and keeps user text safe", () => {
    const container = document.createElement("div");

    renderProjects(container, [testProject]);

    expect(container.querySelectorAll("article")).toHaveLength(1);
    expect(container.textContent).toContain("<b>test</b>");
    expect(container.querySelector("b")).toBeNull();
  });

  test("shows a message when there are no projects", () => {
    const container = document.createElement("div");

    renderProjects(container, []);

    expect(container.textContent).toContain("No projects found");
  });
});

describe("renderDeadlines", () => {
  test("shows a deadline made from data", () => {
    const container = document.createElement("div");
    const items: Deadline[] = [
      {
        title: "TypeScript task",
        course: "Web Programming",
        date: "2026-10-01",
        time: "23:59",
      },
    ];

    renderDeadlines(container, items, new Date("2026-09-28T12:00:00"));

    expect(container.textContent).toContain("TypeScript task");
    expect(container.textContent).toContain("3 days");
  });
});
