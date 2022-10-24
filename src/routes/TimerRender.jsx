import React, { useState, useRef } from "react";
import { useUser } from "../context/UserContext";
import { useProject } from "../context/ProjectContext";
import { useTask } from "../context/TaskContext";
import { useTimeLog, useTimeLogDispatch } from "../context/TimeLogContext";
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
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Timer } from "timer-node";
import { changeTimeLogs } from "../data/getTimeLogs";

dayjs.extend(customParseFormat);

function TimerRender() {
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

  // console.log(logTime, " this is logtime"); //Räkanre
  // console.log(currentTime, " this is currentTime"); //tiden den börja men också tickar ibland?
  // console.log(timeStart, " this is timeStart"); //tickande tid just nu
  // console.log(intervalRef, " this is intervalRef"); //Staticks-igh oklart värde

  const handleStartTimer = async (timelogId) => {
    setCurrentTimeLog(timelogId.id);
    if (!currentTimeLog) return;
    const data = await changeTimeLogs(currentTimeLog, currentTime, timeStart);
    dispatchTimeLog({
      type: "changed",
      id: data.id,
      startTime: data.timeStart,
    });
    timer.start();
    timers.start();
    startTime();
    setCurrentTime(timeStart);
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

  const renderTaskSortedDate = () => {
    return (
      <Container style={{ marginTop: 320, marginBottom: 100 }}>
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
                      .map((t) => (
                        <Box key={t.id}>
                          {projectValue.project &&
                            projectValue.project
                              .filter((p) => p.id === t.projectId)
                              .map((p) => (
                                <Box key={p.id}>
                                  <Box>
                                    {userValue.user &&
                                      userValue.user
                                        .filter((u) => u.id === p.userId)
                                        .map((u) => (
                                          <Box key={u.id}>
                                            <Heading as="h3" size="md">
                                              {u.name}
                                            </Heading>
                                          </Box>
                                        ))}
                                  </Box>
                                  <Heading as="h4" size="lg">
                                    {t.name}
                                  </Heading>
                                  <Button
                                    variant="link"
                                    onClick={() =>
                                      handleStartTimer({ id: tl.id })
                                    }
                                  >
                                    <Icon
                                      as={AiOutlinePlaySquare}
                                      w={250}
                                      h={25}
                                    />
                                  </Button>
                                  <Heading as="h4" size="md">
                                    {tl.startTime}
                                  </Heading>
                                  <Heading as="h4" size="md">
                                    {tl.endTime}
                                  </Heading>
                                  <Button variant="link" onClick={handleStop}>
                                    <Icon as={AiOutlineStop} w={250} h={25} />
                                  </Button>
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
