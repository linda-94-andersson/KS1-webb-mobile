import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { getTimelogs } from "../data/getTimelogs";

function Timer() {
  // useEffect(() => {
  //   getTimelogs();
  // }, []);

  const { user, setUser } = useUser();

  console.log(user, " this is user from timer");

  return (
    <div>
      Timer
      <div>
        {user ? (
          user.map((u) => (
            <p key={u.id}>
              <span>{u.name}</span>
            </p>
          ))
        ) : (
          <span>Nothing to see</span>
        )}
      </div>
    </div>
  );
}

export default Timer;
