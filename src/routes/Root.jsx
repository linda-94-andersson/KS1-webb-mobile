import React from "react";
import { Outlet, Link } from "react-router-dom";
import { ProjectProvider } from "../context/ProjectContext";
import { UserProvider } from "../context/UserContext";

function Root() {
  return (
    <>
      <UserProvider>
        <ProjectProvider>
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
        </ProjectProvider>
      </UserProvider>
    </>
  );
}

export default Root;
