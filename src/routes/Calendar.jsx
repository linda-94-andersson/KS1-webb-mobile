import React, { useMemo, useState, useCallback } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useUser } from "../context/UserContext";
import { useTask } from "../context/TaskContext";
import { useProject } from "../context/ProjectContext";
import { useTimeLog } from "../context/TimeLogContext";
import {
  Center,
  Heading,
  Container,
  Box,
  Divider,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { MdOutlineColorLens } from "react-icons/md";

dayjs.extend(customParseFormat);

function Calendar() {
  const [timestampNow, setTimestampNow] = useState(Date.now());
  const [firstDateInput, setFirstDateInput] = useState(
    dayjs(timestampNow).format("YYYY-MM-DD HH:mm")
  );
  const [lastDateInput, setLastDateInput] = useState(
    dayjs(timestampNow).format("YYYY-MM-DD HH:mm")
  );

  const { userValue } = useUser();
  const { projectValue } = useProject();
  const { taskValue } = useTask();
  const { timeLogValue } = useTimeLog();

  const inputFirstAsTimestamp = useMemo(() => {
    if (!firstDateInput) return null;
    const dateString = `${firstDateInput}`;
    return dayjs(dateString, "YYYY-MM-DD HH:mm").valueOf() || null;
  }, [firstDateInput]);

  const inputLastAsTimestamp = useMemo(() => {
    if (!lastDateInput) return null;
    const dateString = `${lastDateInput}`;
    return dayjs(dateString, "YYYY-MM-DD HH:mm").valueOf() || null;
  }, [lastDateInput]);

  const handleFirstInput = useCallback((e) => {
    const value = e.target.value;
    setFirstDateInput(value);
  }, []);

  const handleLastInput = useCallback((e) => {
    const value = e.target.value;
    setLastDateInput(value);
  }, []);

  const renderTimeOnRangeSelect = () => {
    return (
      <Container>
        {timeLogValue.timeLogs ? (
          timeLogValue.timeLogs
            .filter(
              (tl) =>
                dayjs(tl.startTime).valueOf() >= inputFirstAsTimestamp &&
                dayjs(tl.startTime).valueOf() <= inputLastAsTimestamp
            )
            .sort((a, b) => a.startTime - b.startTime)
            .map((tl) => (
              <Box key={tl.id}>
                {taskValue.tasks
                  .filter((t) => t.id === tl.taskId)
                  .map((t) => (
                    <Box key={t.id}>
                      {projectValue.projects
                        .filter((p) => p.id === t.projectId)
                        .map((p) => (
                          <Box key={p.id}>
                            <Icon
                              as={MdOutlineColorLens}
                              w={25}
                              h={25}
                              key={p.id}
                              style={{
                                backgroundColor: p.color,
                              }}
                            ></Icon>
                            {userValue.users
                              .filter((u) => u.id === p.userId)
                              .map((u) => (
                                <Heading as="h3" size="md" key={u.id}>
                                  {u.name}
                                </Heading>
                              ))}
                          </Box>
                        ))}
                      <Heading as="h2" size="lg">
                        {t.name}
                      </Heading>
                      <Box>
                        <Heading as="h4" size="md" key={t.id}>
                          {dayjs(tl.startTime).format("YY/MM/DD HH:mm:ss")}
                        </Heading>
                      </Box>
                      <Divider />
                      <br />
                    </Box>
                  ))}
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
      <header style={{ paddingBottom: 50 }}>
        <Box>
          <Center>
            <Heading as="h1" size="3xl">
              Calendar
            </Heading>
          </Center>
        </Box>
        <br />
        <Box>
          <Center>
            <Heading as="h2" size="sm">
              Choose a range of dates to see active tasks
            </Heading>
          </Center>
        </Box>
      </header>
      <Container style={{ marginBottom: 150 }}>
        <Center>
          <FormControl isRequired>
            <FormLabel>From</FormLabel>
            <Input
              type="datetime-local"
              value={firstDateInput}
              onChange={handleFirstInput}
            />
            <FormLabel>To</FormLabel>
            <Input
              type="datetime-local"
              value={lastDateInput}
              onChange={handleLastInput}
            />
          </FormControl>
        </Center>
        <br />
        {renderTimeOnRangeSelect()}
      </Container>
    </>
  );
}

export default Calendar;
