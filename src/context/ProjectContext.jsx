import React, { useContext, useEffect, useMemo, useState } from "react";
import getProjects from "../data/getProjects";

const ProjectContext = React.createContext();

export function useProject() {
  return useContext(ProjectContext);
}

export function ProjectProvider({ children }) {
  const [project, setProject] = useState(null);

  const value = useMemo(() => ({ project, setProject }), [project, setProject]);

  const getProjectdata = async () => {
    const data = await getProjects();
    setProject(data);
  };

  useEffect(() => {
    getProjectdata();
  }, []);

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}
