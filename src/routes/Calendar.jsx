import React, { useMemo, useState, useCallback } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useUser } from "../context/UserContext";
import { useTask } from "../context/TaskContext";
import { useProject } from "../context/ProjectContext";
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
    dayjs(timestampNow).format("YYYY-MM-DD")
  );
  const [lastDateInput, setLastDateInput] = useState(
    dayjs(timestampNow).format("YYYY-MM-DD")
  );

  const { userValue } = useUser();
  const { projectValue } = useProject();
  const { taskValue } = useTask();

  const inputFirstAsTimestamp = useMemo(() => {
    if (!firstDateInput) return null;
    const dateString = `${firstDateInput}`;
    return dayjs(dateString, "YYYY-MM-DD").valueOf() || null;
  }, [firstDateInput]);

  const inputLastAsTimestamp = useMemo(() => {
    if (!lastDateInput) return null;
    const dateString = `${lastDateInput}`;
    return dayjs(dateString, "YYYY-MM-DD").valueOf() || null;
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
        {taskValue.tasks ? (
          taskValue.tasks
            .filter(
              (t) =>
                t.createdDate >= inputFirstAsTimestamp &&
                t.createdDate <= inputLastAsTimestamp
            )
            .sort((a, b) => a.createdDate - b.createdDate)
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
                    {dayjs(t.createdDate).format("YYYY-MM-DD")}
                  </Heading>
                </Box>
                <Divider />
                <br />
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
        <Center>
          <Heading as="h1" size="3xl">
            Calendar
          </Heading>
        </Center>
      </header>
      <Container style={{ marginBottom: 150 }}>
        <Center>
          <FormControl isRequired>
            <FormLabel>From</FormLabel>
            <Input
              type="date"
              value={firstDateInput}
              onChange={handleFirstInput}
            />
            <FormLabel>To</FormLabel>
            <Input
              type="date"
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
