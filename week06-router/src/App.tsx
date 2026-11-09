import { useLocalStorage } from "./hooks/useLocalStorage";
import { isProjectList } from "./guards";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import Resources from "./components/Resources";
import StatCard from "./components/StatCard";
import SectionHeading from "./components/SectionHeading";
import ProjectSection from "./components/ProjectSection";
import DeadlineSection from "./components/DeadlineSection";
import WeatherCard from "./components/WeatherCard";
import type { CurrentWeather, Deadline, LoadState, Project } from "./types";

interface AppProps {
  projects: LoadState<Project[]>;
  deadlines: LoadState<Deadline[]>;
  weather: LoadState<CurrentWeather>;
  onRetryProjects: () => void;
  onRetryDeadlines: () => void;
}

const STORAGE_KEY = "campusflow.week06.localProjects";

function withLocalProjects(state: LoadState<Project[]>, local: Project[]): LoadState<Project[]> {
  if (state.status !== "success") return state;
  return { status: "success", data: [...state.data, ...local] };
}

function App({ projects, deadlines, weather, onRetryProjects, onRetryDeadlines }: AppProps) {
  const [localProjects, setLocalProjects] = useLocalStorage<Project[]>(STORAGE_KEY, [], isProjectList);
  const allProjects = withLocalProjects(projects, localProjects);

  function handleAdd(project: Project): void {
    setLocalProjects([...localProjects, project]);
  }

  let activeCount = "…";
  if (allProjects.status === "error") activeCount = "–";
  if (allProjects.status === "success") {
    activeCount = String(allProjects.data.filter((project) => project.status === "active").length);
  }
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<div>
        <Hero />
        <section className="mx-auto w-full max-w-[1220px] px-[14px] py-[34px] pb-4 sm:px-5">
          <SectionHeading eyebrow="OVERVIEW" title="Your workspace">
            <p className="max-w-[420px] text-sm text-[#6c7485]">A quick snapshot of what needs attention today.</p>
          </SectionHeading>
          <div className="stats-grid grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard index="01" label="Active projects" value={activeCount} note="API + your projects" tone="positive" />
            <StatCard index="02" label="Tasks completed" value="18" note="+6 this week" tone="positive" />
            <StatCard index="03" label="Quiz average" value="84%" note="Last 4 quizzes" />
            <WeatherCard weather={weather} />
          </div>
        </section>
        <ProjectSection projects={allProjects} onRetry={onRetryProjects} onAdd={handleAdd} />
        <section className="mx-auto w-full max-w-[1220px] px-[14px] pt-[34px] sm:px-5" id="weeklyStatus">
          <div className="flex items-start gap-3 rounded-xl border border-[#bfe7d6] bg-[#eefbf6] p-4 text-sm text-[#176b4c]">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#1ca76f]"></span>
            <p><strong>On track.</strong> You completed 7 tasks and have 2 deadlines coming up this week.</p>
          </div>
        </section>
        <section className="mx-auto grid w-full max-w-[1220px] grid-cols-1 gap-[18px] px-[14px] py-[34px] pb-16 sm:px-5 lg:grid-cols-[1.45fr_.75fr]">
          <DeadlineSection deadlines={deadlines} onRetry={onRetryDeadlines} />
          <Resources />
        </section>
        </div>} />
        <Route path="projects" element={<h1>Projects</h1>} />
        <Route path="projects/:projectId" element={<h1>Project details</h1>} />
        <Route path="deadlines" element={<h1>Deadlines</h1>} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
