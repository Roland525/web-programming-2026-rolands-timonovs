import { Link } from "react-router";
import { categoryBadge, statusBadge, statusLabel, progressColor } from "../projectStyles";

import type { Project } from "../types";

import { formatDate } from "../date";

import Pill from "./Pill";



interface ProjectCardProps {

  project: Project;

}



function ProjectCard({ project }: ProjectCardProps) {

  const barColor = project.status === "done" ? "bg-[#1ca76f]" : progressColor[project.category];



  return (

    <article className="project-card rounded-[18px] border border-[#e5e9f2] bg-white p-[22px] transition duration-200 hover:-translate-y-1 hover:border-[#d5d9e6] hover:shadow-xl">

      <div className="flex items-center justify-between gap-3">

        <Pill className={categoryBadge[project.category]}>{project.category}</Pill>

        <Pill className={statusBadge[project.status]}>{statusLabel[project.status]}</Pill>

      </div>

      <h3 className="mb-2 mt-6 text-xl font-bold tracking-[-0.025em]">{project.title}</h3>

      <p className="min-h-[66px] text-[13px] text-[#6c7485]">{project.description}</p>

      <div className="mb-2 mt-[22px] flex items-center justify-between gap-3 text-[10px] font-bold text-[#6c7485]">

        <span>{project.status === "done" ? "Submitted" : "Due"} {formatDate(project.dueDate)}</span>

        <span>{project.progress}% complete</span>

      </div>

      <div className="h-[7px] overflow-hidden rounded-full bg-[#eceef4]">

        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${project.progress}%` }}></div>

      </div>

      <Link to={`/projects/${encodeURIComponent(project.id)}`} className="mt-[18px] inline-block text-xs font-extrabold text-[#6d5dfc] hover:text-[#5547df] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d5dfc]">

        {project.status === "done" ? "View submission →" : "Open project →"}

      </Link>

    </article>

  );

}



export default ProjectCard;
