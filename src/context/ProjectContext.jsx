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

  function projectsReducer(project, action) {
    switch (action.type) {
      case "added": {
        return project.push();
      }
      case "changed": {
        return project.map((p) => {
          if (p.id === action.project.id) {
            return action.project;
          } else {
            return p;
          }
        });
      }
      case "deleted": {
        return project.filter((p) => p.id !== action.id);
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  }

  const projectValue = useMemo(() => ({ project, setProject }), [project, setProject]);

  const getProjectdata = async () => {
    const data = await getProjects();
    setProject(data);
  };

  useEffect(() => {
    getProjectdata();
  }, []);

  return (
    <ProjectContext.Provider value={{ projectValue, getProjectdata }}>
      <ProjectDispatchContext.Provider value={{ dispatch }}>
        {children}
      </ProjectDispatchContext.Provider>
    </ProjectContext.Provider>
  );
}
