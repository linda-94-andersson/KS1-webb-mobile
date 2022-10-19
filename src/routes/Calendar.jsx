import React from "react";
import { useUser } from "../context/UserContext";

function Calendar() {
  const { value } = useUser();

  return (
    <>
      <header>
        <h1>Calendar</h1>
      </header>
      <section>
        <select>
          <option>Dagens datum</option>
          <option>Datum</option>
        </select>
        <div>
          <h2>
            {value.user ? (
              value.user.map((u) => (
                <p key={u.id}>
                  <span>{u.name}</span>
                </p>
              ))
            ) : (
              <span>No users found</span>
            )}
          </h2>
          <h3>task name</h3>
          <h4>timer</h4>
        </div>
      </section>
    </>
  );
}

export default Calendar;
