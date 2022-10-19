import React, { useState } from "react";
import { useProject } from "../context/ProjectContext";
import AddProject from "./AddProject";

function Projects() {
  const [isOpen, setIsOpen] = useState(false);

  const { projectValue } = useProject();

  const handleAddProject = () => {
    setIsOpen(true);
  };

  return (
    <>
      {projectValue.project ? (
        projectValue.project.map((p) => (
          <div key={p.id}>
            <div
              style={{
                backgroundColor: p.color,
                width: 25,
                height: 25,
              }}
            >
              <h2 style={{ marginLeft: 30, width: 300 }}>{p.name}</h2>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h2>No projects found</h2>
        </div>
      )}
      <br />
      <button onClick={handleAddProject}>Add new project</button>
      {isOpen && <AddProject setIsOpen={setIsOpen} />}
    </>
  );
}

export default Projects;
