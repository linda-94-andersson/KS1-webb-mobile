import React from "react";
import { useUser } from "../context/UserContext";

function Timer() {
  const { user } = useUser();

  return (
    <>
      <header>
        <h2>Timer</h2>
        <h1>Aktuell timer</h1>
        <h3>Aktuell timer projekt namn</h3>
        <div>
          <h4>total</h4>
          <span>timer</span>
          <h4>today</h4>
          <span>timer</span>
        </div>
      </header>
      <section>
        <div>
          <h2>datum</h2>
          <div>
            <h2>
              {user ? (
                user.map((u) => (
                  <p key={u.id}>
                    <span>{u.name}</span>
                  </p>
                ))
              ) : (
                <span>No users found</span>
              )}
            </h2>
            <h3>taks</h3>
            <h4>timer</h4>
            <button>Play</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Timer;
