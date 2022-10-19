import React, { useState } from "react";
import { useTask } from "../context/TaskContext";
import AddTask from "./AddTask";

function Tasks() {
  const [isOpen, setIsOpen] = useState(false);

  const { value } = useTask();

  const handleAddTask = () => {
    setIsOpen(true);
  };

  return (
    <>
      {value.task ? (
        value.task.map((t) => (
          <div key={t.id}>
            <h2>{t.name}</h2>
          </div>
        ))
      ) : (
        <div>
          <h2>No tasks found</h2>
        </div>
      )}
      <button onClick={handleAddTask}>Add new Tasks</button>
      {isOpen && <AddTask setIsOpen={setIsOpen} />}
    </>
  );
}

export default Tasks;
