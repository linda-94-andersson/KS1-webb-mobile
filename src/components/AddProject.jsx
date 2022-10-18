import React from "react";
import { useUser } from "../context/UserContext";
import "./temporaryCss.css";

function AddProject({ setIsOpen }) {
  const { user } = useUser();

  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <header className="modalHeader">
            <h1 className="heading">Add</h1>
          </header>
          <section className="modalContent">
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
        </div>
      </div>
    </>
  );
}

export default AddProject;
