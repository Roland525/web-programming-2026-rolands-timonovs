import type { ProjectFilter } from "../types";

interface ProjectFiltersProps {
  current: ProjectFilter;
  onChange: (filter: ProjectFilter) => void;
}

const filters: ProjectFilter[] = ["all", "active", "done"];
const labels: Record<ProjectFilter, string> = {
  all: "All",
  active: "Active",
  done: "Done",
};

function ProjectFilters({ current, onChange }: ProjectFiltersProps) {
  return (
    <div className="inline-flex rounded-xl border border-[#e5e9f2] bg-white p-1" aria-label="Project filters">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          aria-pressed={current === filter}
          onClick={() => onChange(filter)}
          className={`filter-button flex-1 cursor-pointer rounded-lg px-3 py-2 text-xs font-bold hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d5dfc] ${current === filter ? "bg-slate-100 text-[#172033]" : "text-[#6c7485]"}`}
        >
          {labels[filter]}
        </button>
      ))}
    </div>
  );
}

export default ProjectFilters;
