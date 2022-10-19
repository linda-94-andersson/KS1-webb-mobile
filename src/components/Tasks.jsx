import React, { useState } from "react";
import { useProject } from "../context/ProjectContext";
import { useTask } from "../context/TaskContext";
import AddTask from "./AddTask";

function Tasks() {
  const [isOpen, setIsOpen] = useState(false);

  const { taskValue } = useTask();
  const { projectValue } = useProject();

  const handleAddTask = () => {
    setIsOpen(true);
  };

  return (
    <>
      {taskValue.task ? (
        taskValue.task.map((t) => (
          <div key={t.id}>
            {projectValue.project
              .filter((p) => p.id === t.projectId)
              .map((c) => (
                <div
                  key={c.id}
                  style={{
                    backgroundColor: c.color,
                    width: 25,
                    height: 25,
                  }}
                >
                  <h2 style={{ marginLeft: 30, width: 300 }}>{t.name}</h2>
                </div>
              ))}
          </div>
        ))
      ) : (
        <div>
          <h2>No tasks found</h2>
        </div>
      )}
      <br/>
      <button onClick={handleAddTask}>Add new Tasks</button>
      {isOpen && <AddTask setIsOpen={setIsOpen} />}
    </>
  );
}

export default Tasks;
