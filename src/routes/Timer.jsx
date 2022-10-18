import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { getTimelogs } from "../data/getTimelogs";

function Timer() {
  // useEffect(() => {
  //   getTimelogs();
  // }, []);

  const { user, setUser } = useUser();

  return (
    <div>
      Timer
      <p>
        {user ? (
          Object.keys(user).map((u) => <span key={u.id}>{u.name}</span>)
        ) : (
          <span>Nothing to see</span>
        )}
      </p>
    </div>
  );
}

export default Timer;
