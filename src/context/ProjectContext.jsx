import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { getProjects } from "../data/getProjects";

const ProjectContext = React.createContext();
const ProjectDispatchContext = createContext(null);

export function useProject() {
  return useContext(ProjectContext);
}

export function useProjectDisptach() {
  return useContext(ProjectDispatchContext);
}

export function ProjectProvider({ children }) {
  const initialState = [];

  const [project, setProject] = useState(null);
  const [projects, dispatch] = useReducer(projectsReducer, initialState);

  function projectsReducer(projects, action) {
    switch (action.type) {
      case "added": {
        return [...projects, action.project];
      }
      case "changed": {
        return projects.map((p) => {
          if (p.id === action.project.id) {
            return action.project;
          } else {
            return p;
          }
        });
      }
      case "deleted": {
        return projects.filter((p) => p.id !== action.id);
      }
      default: {
        return projects;
      }
    }
  }

  const projectValue = useMemo(
    () => ({ project, setProject }),
    [project, setProject]
  );

  const getProjectData = async () => {
    const data = await getProjects();
    setProject(data);
  };

  useEffect(() => {
    getProjectData();
  }, []);

  return (
    <ProjectContext.Provider value={{ projectValue, getProjectData }}>
      <ProjectDispatchContext.Provider value={{ dispatch }}>
        {children}
      </ProjectDispatchContext.Provider>
    </ProjectContext.Provider>
  );
}
