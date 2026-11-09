import { Route, Routes } from "react-router";

import { useLocalStorage } from "./hooks/useLocalStorage";

import { isProjectList } from "./guards";

import Layout from "./components/Layout";

import DashboardPage from "./pages/DashboardPage";

import ProjectsPage from "./pages/ProjectsPage";

import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import DeadlinesPage from "./pages/DeadlinesPage";

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



  return (

    <Routes>

      <Route element={<Layout />}>

        <Route index element={<DashboardPage projects={allProjects} deadlines={deadlines} weather={weather} onRetryDeadlines={onRetryDeadlines} />} />

        <Route path="projects" element={<ProjectsPage projects={allProjects} onRetry={onRetryProjects} onAdd={handleAdd} />} />

        <Route path="projects/:projectId" element={<ProjectDetailsPage projects={allProjects} onRetry={onRetryProjects} />} />

        <Route path="deadlines" element={<DeadlinesPage deadlines={deadlines} onRetry={onRetryDeadlines} />} />

        <Route path="*" element={<h1>Page not found</h1>} />

      </Route>

    </Routes>

  );

}



export default App;

