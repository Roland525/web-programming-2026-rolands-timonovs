import type { Category, ProjectStatus } from "./types";

export const categoryBadge: Record<Category, string> = {
  Frontend: "bg-[#f0edff] text-[#6352ed]",
  API: "bg-[#eaf3ff] text-[#2f78d6]",
  JavaScript: "bg-[#e9f8f2] text-[#16875b]",
  Design: "bg-[#fff5de] text-[#aa7416]",
};

export const statusBadge: Record<ProjectStatus, string> = {
  active: "bg-[#eef6ff] text-[#3788ff]",
  done: "bg-[#edf9f4] text-[#1ca76f]",
};

export const statusLabel: Record<ProjectStatus, string> = {
  active: "Active",
  done: "Done",
};

export const progressColor: Record<Category, string> = {
  Frontend: "bg-[#6d5dfc]",
  API: "bg-[#3788ff]",
  JavaScript: "bg-[#6d5dfc]",
  Design: "bg-[#6d5dfc]",
};
