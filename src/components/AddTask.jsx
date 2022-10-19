import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { addTask } from "../data/getTasks";
import { useTask, useTaskDispatch } from "../context/TaskContext";
import { useProject } from "../context/ProjectContext";
import "./temporaryCss.css";

function AddTask({ setIsOpen }) {
  const [input, setInput] = useState();
  const [selectProject, setSelectedProject] = useState();

  const { value } = useProject();
  const { getTaskData } = useTask();
  const { dispatch } = useTaskDispatch();

  const generated_id = uuid();

  const handleSelectProject = (e) => {
    setSelectedProject(e.target.value);
  };

  const handleInputTask = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await addTask(generated_id, input, selectProject);
    dispatch({
      type: "added",
      id: data.id,
      name: data.name,
      projectId: data.projectId,
    });
    await getTaskData();
    setIsOpen(false);
  };

  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <header className="modalHeader">
            <h1 className="heading">Add</h1>
          </header>
          <section className="modalContent">
            <form onSubmit={handleSubmit}>
              <select
                required
                name="projects"
                id="projects"
                value={selectProject}
                onChange={handleSelectProject}
              >
                <option value="">Pick a project</option>
                {value.project ? (
                  value.project.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))
                ) : (
                  <option value="">No projects found</option>
                )}
              </select>
              <input
                required
                type="text"
                name="taskName"
                placeholder="Task name"
                onChange={handleInputTask}
              />
              {value.project ? (
                value.project
                  .filter((p) => p.id === selectProject)
                  .map((p) => (
                    <div
                      key={p.id}
                      style={{
                        width: 25,
                        height: 25,
                        backgroundColor: p.color,
                        marginLeft: 100,
                      }}
                    ></div>
                  ))
              ) : (
                <div></div>
              )}
              <button type="submit">Add task</button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default AddTask;
