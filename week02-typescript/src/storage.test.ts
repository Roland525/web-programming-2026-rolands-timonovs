// @vitest-environment jsdom

import { beforeEach, describe, expect, test } from "vitest";
import { startingProjects } from "./data";
import { loadProjects, saveProjects } from "./storage";

describe("project storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("uses starting data when saved data is broken", () => {
    localStorage.setItem("campusflow-projects", "not json");

    expect(loadProjects(localStorage, startingProjects)).toEqual(startingProjects);
  });

  test("saves and loads projects", () => {
    saveProjects(localStorage, startingProjects);

    expect(loadProjects(localStorage, [])).toEqual(startingProjects);
  });
});
