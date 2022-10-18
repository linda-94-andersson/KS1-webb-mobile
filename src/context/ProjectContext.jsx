import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import getProjects from "../data/getProjects";

const ProjectContext = React.createContext();
const ProjectDispatchContext = createContext(null);

export function useProject() {
  return useContext(ProjectContext);
}

export function useProjectDisptach() {
  return useContext(ProjectDispatchContext);
}

export function ProjectProvider({ children }) {
  const initialState = {
    name: null,
    color: null,
  };

  const [project, setProject] = useState(null);
  const [projects, dispatch] = useReducer(projectsReducer, initialState);

  function projectsReducer(project, action) {
    async function addProject() {
      const res = await axios.request({
        method: "post",
        url: `http://${import.meta.env.VITE_SOME_KEY}/projects`,
        data: { name: action.name, color: action.color },
      });
      return res.data;
    }

    switch (action.type) {
      case "added": {
        addProject();
        return {
          ...initialState,
          name: action.name,
          color: action.color,
        };
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

  const value = useMemo(() => ({ project, setProject }), [project, setProject]);

  const getProjectdata = async () => {
    const data = await getProjects();
    setProject(data);
  };

  useEffect(() => {
    getProjectdata();
  }, []);

  return (
    <ProjectContext.Provider value={value}>
      <ProjectDispatchContext.Provider value={{ dispatch }}>
        {children}
      </ProjectDispatchContext.Provider>
    </ProjectContext.Provider>
  );
}
