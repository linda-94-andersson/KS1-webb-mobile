import React, { useState } from "react";
import { useUser, useUserDispatch } from "../context/UserContext";
import { deleteUser } from "../data/getUsers";
import AddUser from "./AddUser";

function User() {
  const [isOpen, setIsOpen] = useState(false);

  const { userValue, getUserData } = useUser();
  const { dispatch } = useUserDispatch();

  const handleDelete = async (id) => {
    const data = await deleteUser(id);
    dispatch({
      type: "deleted",
      id: data.id,
    });
    await getUserData(); 
  };

  const handleAddUser = () => {
    setIsOpen(true);
  };

  return (
    <>
      {userValue.user ? (
        userValue.user.map((u) => (
          <div key={u.id}>
            <h2>{u.name}</h2>
            <button onClick={() => handleDelete(u.id)}>Delete</button>
          </div>
        ))
      ) : (
        <div>
          <h2>No users found</h2>
        </div>
      )}
      <br />
      <button onClick={handleAddUser}>Add new user</button>
      {isOpen && <AddUser setIsOpen={setIsOpen} />}
    </>
  );
}

export default User;
