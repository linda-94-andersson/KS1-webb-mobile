import React from "react";
import { Outlet, Link } from "react-router-dom";
import { UserProvider } from "../context/UserContext";

function Root() {
  return (
    <>
      <UserProvider>
        <p>Root</p>
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
        <Outlet />
      </UserProvider>
    </>
  );
}

export default Root;
