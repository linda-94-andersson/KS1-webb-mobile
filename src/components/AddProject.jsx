import React, { useState } from "react";
import { useProject } from "../context/ProjectContext";
import { useUser } from "../context/UserContext";
import "./temporaryCss.css";

function AddProject({ setIsOpen }) {
  const [input, setInput] = useState();
  const [selectedUser, setSelectedUser] = useState();

  const { user } = useUser();
  const { project } = useProject();

  const handleSelectedUser = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleAddProject = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    console.log(input, " this is input");
    console.log(selectedUser, " this is selectedUser");
    // setIsOpen(false);
    //submit data trough dispatch?
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
            <form onSubmit={(e) => e.preventDefault()}>
              <select
                name="users"
                id="users"
                required
                value={selectedUser}
                onChange={handleSelectedUser}
              >
                <option value="">Pick a user</option>
                {user ? (
                  user.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))
                ) : (
                  <option value="">No users found</option>
                )}
              </select>
              <input
                required
                type="text"
                name="projectName"
                placeholder="Project name"
                onChange={handleAddProject}
              />
              <div>color display</div>
              <button type="submit" onClick={handleSubmit}>
                Add project
              </button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default AddProject;
