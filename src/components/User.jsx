import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import AddUser from "./AddUser";

function User() {
  const [isOpen, setIsOpen] = useState(false);

  const { value } = useUser();

  const handleAddUser = () => {
    setIsOpen(true);
  };

  return (
    <>
      {value.user ? (
        value.user.map((u) => (
          <div key={u.id}>
            <h2>{u.name}</h2>
          </div>
        ))
      ) : (
        <div>
          <h2>No users found</h2>
        </div>
      )}
      <button onClick={handleAddUser}>Add new user</button>
      {isOpen && <AddUser setIsOpen={setIsOpen} />}
    </>
  );
}

export default User;
