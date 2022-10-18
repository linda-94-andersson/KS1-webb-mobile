import React from "react";
import { useUser } from "../context/UserContext";

function AddProject() {
  const { user } = useUser();

  return (
    <>
      <header>
        <h1>Add</h1>
      </header>
      <section>
        <select>
          <option>Pick a user</option>
          {user ? (
            user.map((u) => <option key={u.id}>{u.name}</option>)
          ) : (
            <option>No users found</option>
          )}
        </select>
        <input type="text" name="projectName" placeholder="Project name" />
        <div>color display</div>
        <button>Add project</button>
      </section>
    </>
  );
}

export default AddProject;
