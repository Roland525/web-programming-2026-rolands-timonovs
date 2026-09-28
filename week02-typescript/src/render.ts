import type { Category, Deadline, Project } from "./types";

const categoryColors: Record<Category, string> = {
  Frontend: "bg-[#f0edff] text-[#6352ed]",
  API: "bg-[#eaf3ff] text-[#2f78d6]",
  JavaScript: "bg-[#e9f8f2] text-[#16875b]",
  Design: "bg-[#fff5de] text-[#aa7416]",
};

function makeElement(tag: string, className: string, text = ""): HTMLElement {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function daysUntil(date: string, today: Date): number {
  const deadline = new Date(`${date}T00:00:00`);
  const currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.round((deadline.getTime() - currentDay.getTime()) / oneDay);
}

function deadlineText(date: string, today: Date): string {
  const days = daysUntil(date, today);

  if (days < 0) return "Overdue";
  if (days === 0) return "Today";
  if (days === 1) return "1 day";
  return `${days} days`;
}

export function renderProjects(container: HTMLElement, projects: Project[]): void {
  container.textContent = "";

  if (projects.length === 0) {
    const message = makeElement(
      "p",
      "col-span-full rounded-[18px] border border-[#e5e9f2] bg-white p-8 text-center text-sm text-[#6c7485]",
      "No projects found",
    );
    container.append(message);
    return;
  }

  projects.forEach((project) => {
    const card = makeElement(
      "article",
      "project-card rounded-[18px] border border-[#e5e9f2] bg-white p-[22px] transition duration-200 hover:-translate-y-1 hover:border-[#d5d9e6] hover:shadow-xl",
    );

    const top = makeElement("div", "flex items-center justify-between gap-3");
    const category = makeElement(
      "span",
      `inline-flex min-h-[25px] items-center rounded-full px-2.5 text-[10px] font-extrabold ${categoryColors[project.category]}`,
      project.category,
    );
    const statusColor = project.status === "done"
      ? "bg-[#edf9f4] text-[#1ca76f]"
      : "bg-[#eef6ff] text-[#3788ff]";
    const status = makeElement(
      "span",
      `inline-flex min-h-[25px] items-center rounded-full px-2.5 text-[10px] font-extrabold ${statusColor}`,
      project.status === "done" ? "Done" : "Active",
    );
    top.append(category, status);

    const title = makeElement(
      "h3",
      "mb-2 mt-6 text-xl font-bold tracking-[-0.025em]",
      project.title,
    );
    const description = makeElement(
      "p",
      "min-h-[66px] text-[13px] text-[#6c7485]",
      project.description,
    );

    const details = makeElement(
      "div",
      "mb-2 mt-[22px] flex items-center justify-between gap-3 text-[10px] font-bold text-[#6c7485]",
    );
    const dateWord = project.status === "done" ? "Submitted" : "Due";
    details.append(
      makeElement("span", "", `${dateWord} ${formatDate(project.dueDate)}`),
      makeElement("span", "", `${project.progress}% complete`),
    );

    const progressBar = makeElement("div", "h-[7px] overflow-hidden rounded-full bg-[#eceef4]");
    const progress = makeElement(
      "div",
      `h-full rounded-full ${project.status === "done" ? "bg-[#1ca76f]" : "bg-[#6d5dfc]"}`,
    );
    progress.style.width = `${project.progress}%`;
    progressBar.append(progress);

    const link = makeElement(
      "a",
      "mt-[18px] inline-block text-xs font-extrabold text-[#6d5dfc] hover:text-[#5547df] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d5dfc]",
      project.status === "done" ? "View submission →" : "Open project →",
    ) as HTMLAnchorElement;
    link.href = "#";

    card.append(top, title, description, details, progressBar, link);
    container.append(card);
  });
}

export function renderDeadlines(
  container: HTMLElement,
  items: Deadline[],
  today = new Date(),
): void {
  container.textContent = "";

  items.forEach((deadline, index) => {
    const rowBorder = index < items.length - 1 ? "border-b border-[#e5e9f2]" : "";
    const row = makeElement(
      "article",
      `grid grid-cols-[auto_1fr] items-center gap-3.5 px-2 py-3.5 sm:grid-cols-[auto_1fr_auto] ${rowBorder}`,
    );

    const date = new Date(`${deadline.date}T00:00:00`);
    const dateBox = makeElement(
      "div",
      "grid min-h-[50px] w-[46px] place-items-center content-center rounded-xl bg-slate-50",
    );
    dateBox.append(
      makeElement("strong", "text-[17px] leading-none", String(date.getDate())),
      makeElement(
        "span",
        "mt-1 text-[9px] font-extrabold text-[#6c7485]",
        date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      ),
    );

    const information = makeElement("div", "grid gap-1");
    information.append(
      makeElement("strong", "text-[13px]", deadline.title),
      makeElement("span", "text-[11px] text-[#6c7485]", `${deadline.course} · ${deadline.time}`),
    );

    const days = daysUntil(deadline.date, today);
    let badgeColor = "bg-slate-100 text-[#6f7788]";
    if (days < 0) badgeColor = "bg-[#fdeeee] text-[#c64444]";
    else if (days <= 5) badgeColor = "bg-[#fff5de] text-[#aa7416]";

    const badge = makeElement(
      "span",
      `col-start-2 inline-flex min-h-[25px] w-fit items-center rounded-full px-2.5 text-[10px] font-extrabold sm:col-auto ${badgeColor}`,
      deadlineText(deadline.date, today),
    );

    row.append(dateBox, information, badge);
    container.append(row);
  });
}
