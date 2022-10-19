import React, { useState } from "react";
import Projects from "../components/Projects";
import Tasks from "../components/Tasks";
import User from "../components/User";

function Overview() {
  const [isSelUser, setIsSelUser] = useState(true);
  const [isSelPro, setIsSelPro] = useState(false);
  const [isSelTas, setIsSelTas] = useState(false);

  const handleUsers = () => {
    setIsSelUser(true);
    setIsSelPro(false);
    setIsSelTas(false);
  };

  const handleProjects = () => {
    setIsSelPro(true);
    setIsSelTas(false);
    setIsSelUser(false);
  };

  const handleTasks = () => {
    setIsSelTas(true);
    setIsSelUser(false);
    setIsSelPro(false);
  };

  return (
    <>
      <header>
        <h1>Overview</h1>
      </header>
      <section>
        <nav>
          <ul>
            <li>
              <button onClick={handleUsers}>Users</button>
            </li>
            <li>
              <button onClick={handleProjects}>Projects</button>
            </li>
            <li>
              <button onClick={handleTasks}>Tasks</button>
            </li>
          </ul>
        </nav>
        {isSelUser && <User setIsSelUser={setIsSelUser} />}
        {isSelPro && <Projects setIsSelPro={setIsSelPro} />}
        {isSelTas && <Tasks setIsSelTas={setIsSelTas} />}
      </section>
    </>
  );
}

export default Overview;
