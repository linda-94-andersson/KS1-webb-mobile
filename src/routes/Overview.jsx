import React, { useState } from "react";
import Projects from "../components/Projects";
import Tasks from "../components/Tasks";
import User from "../components/User";
import {
  Center,
  Heading,
  Text,
  Tabs,
  TabList,
  Tab,
  Container,
} from "@chakra-ui/react";

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
      <header style={{ paddingBottom: 50 }}>
        <Center>
          <Heading as="h1" size="3xl">
            Overview
          </Heading>
        </Center>
      </header>
      <Container style={{ marginBottom: 150 }}>
        <Center>
          <Tabs>
            <TabList>
              <Tab onClick={handleUsers}>
                <Text fontSize="3xl">Users</Text>
              </Tab>
              <Tab onClick={handleProjects}>
                <Text fontSize="3xl">Projects</Text>
              </Tab>
              <Tab onClick={handleTasks}>
                <Text fontSize="3xl">Tasks</Text>
              </Tab>
            </TabList>
          </Tabs>
        </Center>
        <br />
        {isSelUser && <User setIsSelUser={setIsSelUser} />}
        {isSelPro && <Projects setIsSelPro={setIsSelPro} />}
        {isSelTas && <Tasks setIsSelTas={setIsSelTas} />}
      </Container>
    </>
  );
}

export default Overview;
