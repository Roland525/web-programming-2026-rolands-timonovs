import { BrowserRouter } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { fetchDeadlines, fetchProjects, fetchWeather } from "./api";
import type { CurrentWeather, Deadline, LoadState, Project } from "./types";

const container = document.getElementById("root");
if (container === null) {
  throw new Error("Element #root not found.");
}
const root = createRoot(container);

let projects: LoadState<Project[]> = { status: "loading" };
let deadlines: LoadState<Deadline[]> = { status: "loading" };
let weather: LoadState<CurrentWeather> = { status: "loading" };

function render(): void {
  root.render(
    <StrictMode>
      <BrowserRouter>
      <App
        projects={projects}
        deadlines={deadlines}
        weather={weather}
        onRetryProjects={() => void loadProjects()}
        onRetryDeadlines={() => void loadDeadlines()}
      />
      </BrowserRouter>
    </StrictMode>,
  );
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error) return `${fallback} ${error.message}`;
  return fallback;
}

async function loadProjects(): Promise<void> {
  projects = { status: "loading" };
  render();

  try {
    projects = { status: "success", data: await fetchProjects() };
  } catch (error: unknown) {
    projects = {
      status: "error",
      message: getErrorMessage(error, "Could not load projects."),
    };
  }

  render();
}

async function loadDeadlines(): Promise<void> {
  deadlines = { status: "loading" };
  render();

  try {
    deadlines = { status: "success", data: await fetchDeadlines() };
  } catch (error: unknown) {
    deadlines = {
      status: "error",
      message: getErrorMessage(error, "Could not load deadlines."),
    };
  }

  render();
}

async function loadWeather(): Promise<void> {
  weather = { status: "loading" };
  render();

  try {
    weather = { status: "success", data: await fetchWeather() };
  } catch {
    weather = { status: "error", message: "Weather unavailable" };
  }

  render();
}

render();
void loadProjects();
void loadDeadlines();
void loadWeather();
