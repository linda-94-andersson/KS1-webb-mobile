import React from "react";
import { Outlet, Link } from "react-router-dom";
import { ProjectProvider } from "../context/ProjectContext";
import { TaskProvider } from "../context/TaskContext";
import { TimeLogProvider } from "../context/TimeLogContext";
import { UserProvider } from "../context/UserContext";

function Root() {
  return (
    <>
      <UserProvider>
        <ProjectProvider>
          <TaskProvider>
            <TimeLogProvider>
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
            </TimeLogProvider>
          </TaskProvider>
        </ProjectProvider>
      </UserProvider>
    </>
  );
}

export default Root;
