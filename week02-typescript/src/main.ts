import "./style.css";

import { deadlines, startingProjects } from "./data";
import { renderDeadlines, renderProjects } from "./render";

const projectGrid = document.querySelector<HTMLElement>("#projectGrid");
const deadlineList = document.querySelector<HTMLElement>("#deadlineList");

if (projectGrid) {
  renderProjects(projectGrid, startingProjects);
}

if (deadlineList) {
  renderDeadlines(deadlineList, deadlines);
}
