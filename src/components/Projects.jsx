import React, { useState } from "react";
import { useProject, useProjectDisptach } from "../context/ProjectContext";
import { deleteProject } from "../data/getProjects";
import AddProject from "./AddProject";

function Projects() {
  const [isOpen, setIsOpen] = useState(false);

  const { projectValue, getProjectData } = useProject();
  const { dispatch } = useProjectDisptach();

  const handleDelete = async (id) => {
    const data = await deleteProject(id);
    dispatch({
      type: "deleted",
      id: data,
    });
    await getProjectData();
  };

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
            <button onClick={() => handleDelete(p.id)}>Delete</button>
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
