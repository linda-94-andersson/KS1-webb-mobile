import React from "react";
import { useUser } from "../context/UserContext";
import { useProject } from "../context/ProjectContext";
import { useTask } from "../context/TaskContext";
import { useTimeLog } from "../context/TimeLogContext";
import {
  Center,
  Heading,
  Container,
  Box,
  Divider,
  Text,
  Flex,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { AiOutlinePlaySquare } from "react-icons/ai";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

function Timer() {
  const { userValue } = useUser();
  const { projectValue } = useProject();
  const { taskValue } = useTask();
  const { timeLogValue } = useTimeLog();

  dayjs.extend(customParseFormat);

  return (
    <>
      <header style={{ paddingBottom: 10 }}>
        <Center style={{ paddingBottom: 50 }}>
          <Heading as="h1" size="3xl">
            Timer
          </Heading>
        </Center>
        <Center>
          <Heading as="h2" size="2xl">
            Aktuell timer
          </Heading>
        </Center>
        <Center style={{ paddingBottom: 50 }}>
          <Heading as="h3" size="lg">
            Aktuell timer projekt namn
          </Heading>
        </Center>
        <Container>
          <Flex>
            <Box p="4">
              <Heading as="h4" size="md">
                total
              </Heading>
              <Text>timer</Text>
            </Box>
            <Spacer />
            <Box p="4">
              <Heading as="h4" size="md">
                today
              </Heading>
              <Text>timer</Text>
            </Box>
          </Flex>
        </Container>
        <Divider />
      </header>
      <Container style={{ marginLeft: 15, marginBottom: 150 }}>
        {timeLogValue.timeLogs ? (
          timeLogValue.timeLogs
            .sort((a, b) => b.startDate - a.startDate)
            .map((tl) => (
              <Box key={tl.id}>
                <Heading as="h2" size="md">
                  {dayjs(tl.startDate).format("YYYY-MM-DD")}
                </Heading>
                <Container>
                  {taskValue.task &&
                    taskValue.task
                      .filter((t) => t.id === tl.taskId)
                      .map((i) => (
                        <Box key={i.id}>
                          {projectValue.project &&
                            projectValue.project
                              .filter((p) => p.id === i.projectId)
                              .map((j) => (
                                <Box key={j.id}>
                                  <Box>
                                    {userValue.user &&
                                      userValue.user
                                        .filter((u) => u.id === j.userId)
                                        .map((k) => (
                                          <Box key={k.id}>
                                            <Heading as="h3" size="md">
                                              {k.name}
                                            </Heading>
                                          </Box>
                                        ))}
                                  </Box>
                                  <Heading
                                    as="h4"
                                    size="lg"
                                    style={{ display: "inline" }}
                                  >
                                    {i.name}
                                  </Heading>
                                  <Button variant="link">
                                    <Icon
                                      as={AiOutlinePlaySquare}
                                      w={250}
                                      h={25}
                                    />
                                  </Button>
                                  <Heading as="h4" size="md">
                                    {tl.startTime}
                                  </Heading>
                                  <Divider />
                                  <br />
                                </Box>
                              ))}
                        </Box>
                      ))}
                </Container>
              </Box>
            ))
        ) : (
          <Heading>No tasks found</Heading>
        )}
      </Container>
    </>
  );
}

export default Timer;
