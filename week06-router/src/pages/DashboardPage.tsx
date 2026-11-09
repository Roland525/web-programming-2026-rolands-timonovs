import Hero from "../components/Hero";
import Resources from "../components/Resources";
import StatCard from "../components/StatCard";
import SectionHeading from "../components/SectionHeading";
import DeadlineSection from "../components/DeadlineSection";
import WeatherCard from "../components/WeatherCard";
import type { CurrentWeather, Deadline, LoadState, Project } from "../types";

interface DashboardPageProps {
  projects: LoadState<Project[]>;
  deadlines: LoadState<Deadline[]>;
  weather: LoadState<CurrentWeather>;
  onRetryDeadlines: () => void;
}

function DashboardPage({ projects, deadlines, weather, onRetryDeadlines }: DashboardPageProps) {
  let activeCount = "…";
  if (projects.status === "error") activeCount = "–";
  if (projects.status === "success") {
    activeCount = String(projects.data.filter((project) => project.status === "active").length);
  }

  return (
    <>
      <title>Dashboard · CampusFlow</title>
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
      <section className="mx-auto grid w-full max-w-[1220px] grid-cols-1 gap-[18px] px-[14px] py-[34px] pb-16 sm:px-5 lg:grid-cols-[1.45fr_.75fr]">
        <DeadlineSection deadlines={deadlines} onRetry={onRetryDeadlines} limit={3} />
        <Resources />
      </section>
    </>
  );
}

export default DashboardPage;
