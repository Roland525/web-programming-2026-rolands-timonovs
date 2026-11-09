import { Link, useParams } from "react-router";
import { EmptyBox, ErrorBox, LoadingBox } from "../components/StateBox";
import Pill from "../components/Pill";
import { daysUntil, formatDate } from "../date";
import { categoryBadge, statusBadge, statusLabel, progressColor } from "../projectStyles";
import type { LoadState, Project } from "../types";
interface ProjectDetailsPageProps {
  projects: LoadState<Project[]>;
  onRetry: () => void;
}
function ProjectDetailsPage({ projects, onRetry }: ProjectDetailsPageProps) {
  const { projectId } = useParams();
  let content;
  let title = "Project · CampusFlow";
  if (projects.status === "loading") {
    content = <LoadingBox text="Loading project…" />;
  } else if (projects.status === "error") {
    content = <ErrorBox message={projects.message} onRetry={onRetry} />;
  } else {
    const project = projects.data.find((item) => item.id === projectId);
    if (project === undefined) {
      content = <EmptyBox title="Project not found" text={`There is no project with id ${projectId}.`} />;
    } else {
      title = `${project.title} · CampusFlow`;
      const days = daysUntil(project.dueDate);
      let dueText = `Due ${formatDate(project.dueDate)} — in ${days} days`;
      if (days === 0) dueText = `Due ${formatDate(project.dueDate)} — today`;
      if (days === 1) dueText = `Due ${formatDate(project.dueDate)} — in 1 day`;
      if (days < 0) dueText = `Overdue since ${formatDate(project.dueDate)}`;
      if (project.status === "done") dueText = `Submitted ${formatDate(project.dueDate)}`;
      const barColor = project.status === "done" ? "bg-[#1ca76f]" : progressColor[project.category];
      content = (
        <article className="rounded-[18px] border border-[#e5e9f2] bg-white p-6">
          <div className="flex flex-wrap gap-3">
            <Pill className={categoryBadge[project.category]}>{project.category}</Pill>
            <Pill className={statusBadge[project.status]}>{statusLabel[project.status]}</Pill>
          </div>
          <h1 className="mt-6 text-3xl font-bold">{project.title}</h1>
          <p className="my-5 text-sm text-[#6c7485]">{project.description}</p>
          <p className="text-sm">{dueText}</p>
          <p className="mb-2 mt-5 text-sm font-bold">{project.progress}% complete</p>
          <div className="h-[7px] overflow-hidden rounded-full bg-[#eceef4]">
            <div className={`h-full rounded-full ${barColor}`} style={{ width: `${project.progress}%` }}></div>
          </div>
        </article>
      );
    }
  }
  return (
    <section className="mx-auto w-full max-w-[1220px] break-words px-[14px] py-[34px] sm:px-5">
      <title>{title}</title>
      <Link to="/projects" className="mb-6 inline-block rounded text-sm font-bold text-[#6d5dfc] focus-visible:outline-2 focus-visible:outline-offset-2">← All projects</Link>
      {content}
    </section>
  );
}
export default ProjectDetailsPage;
