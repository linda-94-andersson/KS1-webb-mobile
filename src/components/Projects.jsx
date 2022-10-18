import React from "react";
import { useProject } from "../context/ProjectContext";

function Projects() {
  const { project } = useProject();

  return (
    <>
      {project ? (
        project.map((p) => (
          <div key={p.id}>
            <h2>{p.name}</h2>
          </div>
        ))
      ) : (
        <div>
          <h2>No projects found</h2>
        </div>
      )}
      <button>Add new project</button>
    </>
  );
}

export default Projects;
