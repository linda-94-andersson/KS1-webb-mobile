import axios from "axios";
import React, { useState } from "react";
// import { v4 as uuid } from "uuid";
import InputColor from "react-input-color";
import { useProjectDisptach } from "../context/ProjectContext";
import { useUser } from "../context/UserContext";
import "./temporaryCss.css";

function AddProject({ setIsOpen }) {
  const [input, setInput] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [color, setColor] = useState({});

  const { user } = useUser();
  const { dispatch } = useProjectDisptach();

  // const generated_id = uuid();

  const handleSelectedUser = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleAddProject = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    dispatch({
      type: "added",
      // id: generated_id,
      name: input,
      color: color.hex,
    });
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
            <form onSubmit={(e) => e.preventDefault()}>
              <select
                required
                name="users"
                id="users"
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
              <br />
              <InputColor
                initialValue="#5e72e4"
                onChange={setColor}
                placement="middle"
              />
              <br />
              <button type="button" onClick={handleSubmit}>
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
