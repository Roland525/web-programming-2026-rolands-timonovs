import { useState } from "react";
import type { LoadState, Project, ProjectFilter } from "../types";
import ProjectFilters from "./ProjectFilters";
import ProjectList from "./ProjectList";
import SectionHeading from "./SectionHeading";

interface ProjectSectionProps {
  projects: LoadState<Project[]>;
  onRetry: () => void;
}

function ProjectSection({ projects, onRetry }: ProjectSectionProps) {
  const [filter, setFilter] = useState<ProjectFilter>("all");

  return (
    <section id="projects" className="mx-auto w-full max-w-[1220px] px-[14px] py-[34px] pb-4 sm:px-5">
      <SectionHeading eyebrow="PROJECTS" title="Current work">
        <ProjectFilters current={filter} onChange={setFilter} />
      </SectionHeading>
      <div className="projects-grid grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-3" id="projectGrid">
        <ProjectList state={projects} filter={filter} onRetry={onRetry} />
      </div>
    </section>
  );
}

export default ProjectSection;
