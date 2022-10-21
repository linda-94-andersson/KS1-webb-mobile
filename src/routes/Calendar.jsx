import React, { useState } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle";
import { useUser } from "../context/UserContext";
import { useTask } from "../context/TaskContext";
import { useProject } from "../context/ProjectContext";
import { Center, Heading, Container, Box, Divider } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { MdOutlineColorLens } from "react-icons/md";

function Calendar() {
  const [value, onChange] = useState([new Date(), new Date()]);

  const { userValue } = useUser();
  const { projectValue } = useProject();
  const { taskValue } = useTask();

  // console.log(value, " vad är value?");

  const renderDayTaks = () => {
    return (
      <Container>
        {taskValue.task ? (
          taskValue.task.map((t) => (
            <Box key={t.id}>
              {projectValue.project
                .filter((p) => p.id === t.projectId)
                .map((i) => (
                  <Box key={i.id}>
                    <Icon
                      as={MdOutlineColorLens}
                      w={25}
                      h={25}
                      key={i.id}
                      style={{
                        backgroundColor: i.color,
                      }}
                    ></Icon>
                    {userValue.user
                      .filter((u) => u.id === i.userId)
                      .map((j) => (
                        <Heading as="h3" size="lg" key={j.id}>
                          {j.name}
                        </Heading>
                      ))}
                  </Box>
                ))}
              <Heading as="h2" size="2xl">
                {t.name}
              </Heading>
              <Heading as="h4" size="md">
                timer
              </Heading>
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
      <Container>
        <Center>
          <DateRangePicker
            onChange={onChange}
            value={value}
            disableCalendar={true}
            required={true}
            showLeadingZeros={true}
          />
        </Center>
        {renderDayTaks()}
      </Container>
    </>
  );
}

export default Calendar;
