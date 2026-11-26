import { expect, it } from "vitest";
import type { Project } from "./types";
import { filterProjects } from "./projectFilter";

const active: Project = {
  id: "p1",
  title: "Portfolio",
  description: "My first site",
  category: "Frontend",
  status: "active",
  dueDate: "2026-12-01",
  progress: 10,
};
const done: Project = { ...active, id: "p2", status: "done", progress: 100 };
const projects = [active, done];

it("shows both projects for All", () => {
  expect(filterProjects(projects, "all")).toEqual(projects);
});

it("shows the active project", () => {
  expect(filterProjects(projects, "active")).toEqual([active]);
});

it("shows the finished project", () => {
  expect(filterProjects(projects, "done")).toEqual([done]);
});

it("returns an empty list when nothing matches", () => {
  expect(filterProjects([active], "done")).toEqual([]);
});
