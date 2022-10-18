import React from "react";
import { useUser } from "../context/UserContext";

function User() {
  const { user } = useUser();

  return (
    <>
      {user ? (
        user.map((u) => (
          <div key={u.id}>
            <h2>{u.name}</h2>
          </div>
        ))
      ) : (
        <div>No users found</div>
      )}
      <button>Add new user</button>
    </>
  );
}

export default User;
