import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import InputColor from "react-input-color";
import { addProject } from "../data/getProjects";
import { useProject, useProjectDisptach } from "../context/ProjectContext";
import { useUser } from "../context/UserContext";
import "./temporaryCss.css";

function AddProject({ setIsOpen }) {
  const [input, setInput] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [color, setColor] = useState({});
  const [validColor, setValidColor] = useState(true);

  const { userValue } = useUser();
  const { projectValue, getProjectData } = useProject();
  const { dispatch } = useProjectDisptach();

  const generated_id = uuid();

  const handleSelectedUser = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleInputProject = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      projectValue.project.find((p) => p.color === color.hex) &&
      projectValue.project.find((p) => p.userId === selectedUser)
    ) {
      return setValidColor(false);
    }

    setValidColor(true);

    const data = await addProject(generated_id, input, color.hex, selectedUser);
    dispatch({
      type: "added",
      id: data.id,
      name: data.name,
      color: data.color,
      userId: data.userId,
    });
    await getProjectData();
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
                name="users"
                id="users"
                value={selectedUser}
                onChange={handleSelectedUser}
              >
                <option value="">Pick a user</option>
                {userValue.user ? (
                  userValue.user.map((u) => (
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
                onChange={handleInputProject}
              />
              <br />
              <InputColor
                initialValue="#5e72e4"
                onChange={setColor}
                placement="middle"
              />
              {!validColor && <span>Please use a diffrent color</span>}
              <br />
              <button type="submit">Add project</button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default AddProject;
