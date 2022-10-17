import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { getUsers } from "../data/getUsers";

function Root() {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <p>Root</p>
      <nav>
        <ul>
          <li>
            <Link to={`timer`}>Timer Link</Link>
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
    </>
  );
}

export default Root;
