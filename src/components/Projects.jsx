import React, { useState } from "react";
import { useProject } from "../context/ProjectContext";
import AddProject from "./AddProject";

function Projects() {
  const [isOpen, setIsOpen] = useState(false);

  const { value } = useProject();

  const handleAddProject = () => {
    setIsOpen(true);
  };

  return (
    <>
      {value.project ? (
        value.project.map((p) => (
          <div key={p.id}>
            <h2>{p.name}</h2>
          </div>
        ))
      ) : (
        <div>
          <h2>No projects found</h2>
        </div>
      )}
      <button onClick={handleAddProject}>Add new project</button>
      {isOpen && <AddProject setIsOpen={setIsOpen} />}
    </>
  );
}

export default Projects;
