import React, { useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Timer } from "timer-node";
import { useUser } from "../context/UserContext";
import { useProject } from "../context/ProjectContext";
import { useTask } from "../context/TaskContext";
import { useTimeLog, useTimeLogDispatch } from "../context/TimeLogContext";
import { addTimeLogs, changeTimeLogs } from "../data/getTimeLogs";
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
import { AiOutlinePlaySquare, AiOutlineStop } from "react-icons/ai";
import { MdOutlineColorLens } from "react-icons/md";
import { RiDeleteBack2Line } from "react-icons/ri";

dayjs.extend(customParseFormat);

function TimerRender() {
  const [currentTask, setCurrentTask] = useState();
  const [currentTimeLog, setCurrentTimeLog] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [logTime, setLogTime] = useState("0d-0h:0m:0s");

  const { userValue } = useUser();
  const { projectValue } = useProject();
  const { taskValue } = useTask();
  const { timeLogValue, getTimeLogData } = useTimeLog();
  const { dispatchTimeLog } = useTimeLogDispatch();

  const timer = new Timer();
  const timeStart = dayjs(Date.now()).format("HH:mm:ss");
  const intervalRef = useRef();
  const timeRef = useRef(new Timer());
  const timers = timeRef.current;

  const handlePick = (e) => {
    setCurrentTask(e.target.value);
  };

  const handleStartTimer = async () => {
    if (!currentTask) return;
    console.log("I clicked!");
    const data = await addTimeLogs(uuid(), currentTime, null, currentTask);
    dispatchTimeLog({
      type: "added",
      id: data.id,
      startTime: data.startTime,
      endTime: data.endTime,
      taskId: data.taskId,
    });
    timer.start();
    timers.start();
    startTime();
    setCurrentTime(timeStart);
    setCurrentTimeLog(data.id);
    await getTimeLogData();
  };

  const startTime = () => {
    const id = setInterval(() => {
      setLogTime(timers.format("%label %dd-%hh:%mm:%ss"));
    }, 100);
    intervalRef.current = id;
  };

  const handleStop = async () => {
    if (!currentTimeLog) return;
    const data = await changeTimeLogs(currentTimeLog, currentTime, timeStart);
    console.log(data, " this is data from api");
    dispatchTimeLog({
      type: "changed",
      id: data.id,
      endTime: data.endTime,
    });
    timer.stop();
    timers.stop();
    stopTime();
    setCurrentTime(null);
    setCurrentTimeLog(null);
    await getTimeLogData();
  };

  const stopTime = () => {
    clearInterval(intervalRef.current);
    setLogTime(timers.format("%label %dd-%hh:%mm:%ss"));
  };

  const handleDelete = () => {
    return;
  };

  const renderTaskSortedDate = () => {
    return (
      <Container style={{ marginTop: 320, marginBottom: 100 }}>
        {taskValue.tasks ? (
          taskValue.tasks
            .sort((a, b) => b.createdDate - a.createdDate)
            .map((t) => (
              <Box key={t.id}>
                <Heading as="h2" size="md">
                  {dayjs(t.createdDate).format("YYYY-MM-DD")}
                </Heading>
                <Container>
                  <Box>
                    {projectValue.projects &&
                      projectValue.projects
                        .filter((p) => p.id === t.projectId)
                        .map((p) => (
                          <Box key={p.id}>
                            <Box style={{ display: "inline" }}>
                              {userValue.users &&
                                userValue.users
                                  .filter((u) => u.id === p.userId)
                                  .map((u) => (
                                    <Box
                                      key={u.id}
                                      style={{ display: "inline" }}
                                    >
                                      <Heading
                                        as="h3"
                                        size="md"
                                        style={{ display: "inline" }}
                                      >
                                        {u.name}
                                      </Heading>
                                    </Box>
                                  ))}
                            </Box>
                            <Box style={{ display: "inline", marginLeft: 15 }}>
                              <Icon
                                as={MdOutlineColorLens}
                                w={25}
                                h={25}
                                style={{
                                  backgroundColor: p.color,
                                }}
                              />
                            </Box>
                          </Box>
                        ))}
                    <Heading as="h4" size="lg">
                      {t.name}
                    </Heading>
                    <Heading as="h4" size="md" style={{ display: "inline" }}>
                      starttid
                    </Heading>
                    <Heading
                      as="h4"
                      size="md"
                      style={{ display: "inline", marginLeft: 15 }}
                    >
                      stoptid
                    </Heading>
                    <Box>
                      <Button
                        value={t.id}
                        colorScheme="blue"
                        onClick={handlePick}
                      >
                        Choose me!
                      </Button>
                      {currentTask === t.id && (
                        <>
                          <Button variant="link" onClick={handleStartTimer}>
                            <Icon as={AiOutlinePlaySquare} w={25} h={25} />
                          </Button>
                          <Button variant="link" onClick={handleStop}>
                            <Icon as={AiOutlineStop} w={25} h={25} />
                          </Button>
                          <Button variant="link" onClick={handleDelete}>
                            <Icon as={RiDeleteBack2Line} w={25} h={25} />
                          </Button>
                        </>
                      )}
                    </Box>
                    <Divider />
                    <br />
                  </Box>
                </Container>
              </Box>
            ))
        ) : (
          <Heading>No tasks found</Heading>
        )}
      </Container>
    );
  };

  return (
    <>
      <header
        style={{
          paddingBottom: 10,
          position: "fixed",
          top: 0,
          right: 0,
          width: "100%",
          backgroundColor: "white",
          zIndex: 2,
        }}
      >
        <Center style={{ paddingBottom: 50 }}>
          <Heading as="h1" size="3xl">
            Timer
          </Heading>
        </Center>
        <Center>
          <Heading as="h2" size="2xl">
            {logTime}
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
      {renderTaskSortedDate()}
    </>
  );
}

export default TimerRender;
