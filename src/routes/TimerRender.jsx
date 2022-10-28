import React, { useState, useRef, useMemo } from "react";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import { Timer } from "timer-node";
import { useUser } from "../context/UserContext";
import { useProject } from "../context/ProjectContext";
import { useTask } from "../context/TaskContext";
import { useTimeLog, useTimeLogDispatch } from "../context/TimeLogContext";
import {
  addTimeLogs,
  changeTimeLogs,
  deleteTimeLogs,
} from "../data/getTimeLogs";
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
dayjs.extend(duration);

function TimerRender() {
  const [currentTask, setCurrentTask] = useState(null);
  const [currentTimeLog, setCurrentTimeLog] = useState(null);
  const [currentTime, setCurrentTime] = useState();
  const [logTime, setLogTime] = useState(0);

  const { userValue } = useUser();
  const { projectValue } = useProject();
  const { taskValue } = useTask();
  const { timeLogValue, getTimeLogData } = useTimeLog();
  const { dispatchTimeLog } = useTimeLogDispatch();

  const timer = useRef(new Timer());
  const timeStart = Date.now();
  const intervalRef = useRef();
  const endTime =
    timeLogValue.timeLogs &&
    timeLogValue.timeLogs.find((tl) => tl.endTime === 0);

  const handlePickTask = (e) => {
    if (endTime?.taskId === e.target.value) {
      timer.current.start();
      startTime();
      setCurrentTime(endTime.startTime);
      setCurrentTimeLog(endTime.id);
    }
    setCurrentTask(e.target.value);
  };

  const handlePickLog = (e) => {
    setCurrentTimeLog(e.target.value);
  };

  const handleStartTimer = async () => {
    if (!currentTask) return;
    const data = await addTimeLogs(uuid(), timeStart, 0, currentTask);
    dispatchTimeLog({
      type: "added",
      id: data.id,
      startTime: data.startTime,
      endTime: data.endTime,
      taskId: data.taskId,
    });
    timer.current.start();
    startTime();
    setCurrentTime(timeStart);
    setCurrentTimeLog(data.id);
    await getTimeLogData();
  };

  const startTime = () => {
    const id = setInterval(() => {
      setLogTime(timer.current.ms());
    }, 100);
    intervalRef.current = id;
  };

  const handleStop = async () => {
    if (!currentTimeLog) return;
    const data = await changeTimeLogs(currentTimeLog, timeStart);
    dispatchTimeLog({
      type: "changed",
      id: data.id,
      endTime: data.endTime,
    });
    stopTime();
    setCurrentTime(null);
    await getTimeLogData();
  };

  const stopTime = () => {
    timer.current.stop();
    clearInterval(intervalRef.current);
    setLogTime(0);
  };

  const handleDelete = async () => {
    if (!currentTimeLog) return;
    const data = await deleteTimeLogs(currentTimeLog);
    dispatchTimeLog({
      type: "deleted",
      id: data,
    });
    setCurrentTimeLog(null);
    await getTimeLogData();
  };

  const totalTime = useMemo(() => {
    if (timeLogValue.timeLogs) {
      const filterdTimes = timeLogValue.timeLogs.filter(
        (tl) => tl.taskId === currentTask && tl.endTime
      );
      const elapsed = filterdTimes.reduce((sum, curr) => {
        return sum + (curr.endTime - curr.startTime);
      }, 0);
      return endTime ? elapsed + (Date.now() - endTime.startTime) : elapsed;
    }
  }, [timeLogValue.timeLogs, currentTask]);

  const showTotal = useMemo(() => {
    return dayjs.duration(totalTime + logTime).format("DD-HH:mm:ss");
  }, [totalTime, logTime]);

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
                    <Box>
                      <Button
                        value={t.id}
                        colorScheme="blue"
                        onClick={handlePickTask}
                      >
                        Press to select this task!
                      </Button>
                      {currentTask === t.id && (
                        <>
                          <Button variant="link" onClick={handleStartTimer}>
                            <Icon as={AiOutlinePlaySquare} w={25} h={25} />
                          </Button>
                          <Button variant="link" onClick={handleStop}>
                            <Icon as={AiOutlineStop} w={25} h={25} />
                          </Button>
                          {!currentTime &&
                            timeLogValue.timeLogs
                              .filter((tl) => tl.taskId === t.id)
                              .map((tl) => (
                                <Box key={tl.id}>
                                  <Heading
                                    as="h4"
                                    size="md"
                                    style={{ display: "inline" }}
                                  >
                                    {dayjs(tl.startTime).format("HH:mm:ss")}
                                  </Heading>
                                  <Heading
                                    as="h4"
                                    size="md"
                                    style={{
                                      display: "inline",
                                      marginLeft: 15,
                                      marginRight: 15,
                                    }}
                                  >
                                    {dayjs(tl.endTime).format("HH:mm:ss")}
                                  </Heading>
                                  <Button
                                    value={tl.id}
                                    colorScheme="blue"
                                    variant="link"
                                    onClick={handlePickLog}
                                  >
                                    Pick to delete!
                                  </Button>
                                  {currentTimeLog === tl.id && (
                                    <Button
                                      variant="link"
                                      onClick={handleDelete}
                                    >
                                      <Icon
                                        as={RiDeleteBack2Line}
                                        w={25}
                                        h={25}
                                      />
                                    </Button>
                                  )}
                                </Box>
                              ))}
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
            {showTotal}
          </Heading>
        </Center>
        <Center style={{ paddingBottom: 50 }}>
          <>
            {currentTask &&
              projectValue.projects.map((p) => (
                <Box key={p.id}>
                  {taskValue.tasks
                    .filter((t) => t.id === currentTask)
                    .filter((t) => t.projectId === p.id)
                    .map((t) => (
                      <Heading as="h3" size="lg" key={t.id}>
                        {p.name}
                      </Heading>
                    ))}
                </Box>
              ))}
          </>
        </Center>
        <Container>
          <Flex>
            <Box p="4">
              <Heading as="h4" size="md">
                total
              </Heading>
              <Text>{showTotal && showTotal}</Text>
            </Box>
            <Spacer />
            <Box p="4">
              {/* <Heading as="h4" size="md">
                today
              </Heading>
              <Text>timer</Text> */}
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
