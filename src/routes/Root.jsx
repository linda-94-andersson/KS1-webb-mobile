import React from "react";
import { Outlet, Link } from "react-router-dom";
import { ProjectProvider } from "../context/ProjectContext";
import { TaskProvider } from "../context/TaskContext";
import { TimeLogProvider } from "../context/TimeLogContext";
import { UserProvider } from "../context/UserContext";
import { Link as ReachLink, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { MdTimer } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiTask } from "react-icons/bi";

function Root() {
  return (
    <>
      <UserProvider>
        <ProjectProvider>
          <TaskProvider>
            <TimeLogProvider>
              <footer>
                <LinkBox>
                  <ul>
                    <li>
                      <Link as={ReachLink} to={`/`}>
                        <Icon as={MdTimer} />
                      </Link>
                    </li>
                    <li>
                      <Link as={ReachLink} to={`calendar`}>
                        <Icon as={AiOutlineCalendar} />
                      </Link>
                    </li>
                    <li>
                      <Link as={ReachLink} to={`overview`}>
                        <Icon as={BiTask} />
                      </Link>
                    </li>
                  </ul>
                </LinkBox>
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
