import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { addUser } from "../data/getUsers";
import { useUser, useUserDispatch } from "../context/UserContext";
import "./temporaryCss.css";

function AddUser({ setIsOpen }) {
  const [input, setInput] = useState("");

  const { getUserData } = useUser();
  const { dispatch } = useUserDispatch();

  const generated_id = uuid();

  const handleInputUser = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await addUser(generated_id, input);
    dispatch({
      type: "added",
      id: data.id,
      name: data.name,
    });
    await getUserData();
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
              <input
                required
                type="text"
                name="userName"
                placeholder="User name"
                onChange={handleInputUser}
              />
              <button type="submit">Add User</button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default AddUser;
