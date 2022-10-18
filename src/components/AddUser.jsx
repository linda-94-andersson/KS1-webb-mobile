import React, { useState } from "react";

function AddUser() {
  const [input, setInput] = useState("");

  const handleInputUser = (e) => {
    setInput(e.target.value);
    // send dispcath with user data ? 
  };

  return (
    <>
      <header>
        <h1>Add</h1>
      </header>
      <section>
        <input type="text" name="userName" placeholder="User name" />
        <button onClick={handleInputUser}>Add User</button>
      </section>
    </>
  );
}

export default AddUser;
