import React from "react";
import { Outlet, Link } from "react-router-dom";

function Root() {
  return (
    <>
      <p>Root</p>
      <nav>
        <ul>
          <li>
            <Link to={`timer`}>Timer Link</Link>
          </li>
          <li><Link to={`calander`}>Calendar Link</Link></li>
          <li><Link to={`overview`}>Overview Link</Link></li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Root;
