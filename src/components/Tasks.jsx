import React, { useState } from "react";
import { useProject } from "../context/ProjectContext";
import { useTask, useTaskDispatch } from "../context/TaskContext";
import { deleteTask } from "../data/getTasks";
import AddTask from "./AddTask";

function Tasks() {
  const [isOpen, setIsOpen] = useState(false);

  const { taskValue, getTaskData } = useTask();
  const { dispatch } = useTaskDispatch();
  const { projectValue } = useProject();

  const handleDelete = async (id) => {
    const data = await deleteTask(id);
    dispatch({
      type: "deleted",
      id: data,
    });
    await getTaskData();
  };

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
            <button onClick={() => handleDelete(t.id)}>Delete</button>
          </div>
        ))
      ) : (
        <div>
          <h2>No tasks found</h2>
        </div>
      )}
      <br />
      <button onClick={handleAddTask}>Add new Tasks</button>
      {isOpen && <AddTask setIsOpen={setIsOpen} />}
    </>
  );
}

export default Tasks;
