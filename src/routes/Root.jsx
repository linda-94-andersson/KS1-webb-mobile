import React from "react";
import { Outlet, Link } from "react-router-dom";
import { ProjectProvider } from "../context/ProjectContext";
import { TaskProvider } from "../context/TaskContext";
import { TimeLogProvider } from "../context/TimeLogContext";
import { UserProvider } from "../context/UserContext";
import {
  Center,
  Link as ReachLink,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
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
              <Outlet />
              <Center>
                <footer
                  style={{
                    position: "fixed",
                    bottom: 0,
                    backgroundColor: "white",
                    zIndex: 2,
                    padding: "5px",
                  }}
                >
                  <Tabs>
                    <TabList>
                      <Tab>
                        <Link as={ReachLink} to={`/`}>
                          <Icon as={MdTimer} w={75} h={75} />
                        </Link>
                      </Tab>
                      <Tab>
                        <Link as={ReachLink} to={`calendar`}>
                          <Icon as={AiOutlineCalendar} w={75} h={75} />
                        </Link>
                      </Tab>
                      <Tab>
                        <Link as={ReachLink} to={`overview`}>
                          <Icon as={BiTask} w={75} h={75} />
                        </Link>
                      </Tab>
                    </TabList>
                  </Tabs>
                </footer>
              </Center>
            </TimeLogProvider>
          </TaskProvider>
        </ProjectProvider>
      </UserProvider>
    </>
  );
}

export default Root;
