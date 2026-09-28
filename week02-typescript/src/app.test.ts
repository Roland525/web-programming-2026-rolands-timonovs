import { describe, expect, test } from "vitest";
import { filterProjects } from "./app";
import { startingProjects } from "./data";

describe("filterProjects", () => {
  test("returns all projects for the all filter", () => {
    expect(filterProjects(startingProjects, "all")).toHaveLength(3);
  });

  test("returns only active projects", () => {
    const result = filterProjects(startingProjects, "active");

    expect(result).toHaveLength(2);
    expect(result.every((project) => project.status === "active")).toBe(true);
  });
});
