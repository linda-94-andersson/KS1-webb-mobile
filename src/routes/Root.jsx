import React from "react";
import { Outlet, Link } from "react-router-dom";
import { ProjectProvider } from "../context/ProjectContext";
import { TaskProvider } from "../context/TaskContext";
import { UserProvider } from "../context/UserContext";

function Root() {
  return (
    <>
      <UserProvider>
        <ProjectProvider>
          <TaskProvider>
            <footer>
              <nav>
                <ul>
                  <li>
                    <Link to={`/`}>Root & Timer Link</Link>
                  </li>
                  <li>
                    <Link to={`calendar`}>Calendar Link</Link>
                  </li>
                  <li>
                    <Link to={`overview`}>Overview Link</Link>
                  </li>
                </ul>
              </nav>
            </footer>
            <Outlet />
          </TaskProvider>
        </ProjectProvider>
      </UserProvider>
    </>
  );
}

export default Root;
