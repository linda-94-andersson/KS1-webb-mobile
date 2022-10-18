import React from "react";
import Projects from "../components/Projects";
import Tasks from "../components/Tasks";
import User from "../components/User";

function Overview() {
  return (
    <>
      <header>
        <h1>Overview</h1>
      </header>
      <section>
        <nav>
          <ul>
            <li>Users</li>
            <li>Projects</li>
            <li>Tasks</li>
          </ul>
        </nav>
        <User />
        <Projects />
        <Tasks />
      </section>
    </>
  );
}

export default Overview;
