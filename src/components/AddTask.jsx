import React from "react";

function AddTask() {
  return (
    <>
      <header>
        <h1>Add</h1>
      </header>
      <section>
        <select>
          <option>Pick a project</option>
          <option>project</option>
        </select>
        <input type="text" name="taskName" placeholder="Task name" />
        <div>color display</div>
        <button>Add task</button>
      </section>
    </>
  );
}

export default AddTask;
