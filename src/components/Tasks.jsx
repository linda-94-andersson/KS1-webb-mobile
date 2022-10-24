import React from "react";
import { useProject } from "../context/ProjectContext";
import { useTask, useTaskDispatch } from "../context/TaskContext";
import { useTimeLog } from "../context/TimeLogContext";
import { deleteTask } from "../data/getTasks";
import AddTask from "./AddTask";
import {
  Container,
  Box,
  Heading,
  Button,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { MdOutlineColorLens } from "react-icons/md";
import { RiDeleteBack2Line } from "react-icons/ri";

function Tasks() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { taskValue, getTaskData } = useTask();
  const { dispatchTask } = useTaskDispatch();
  const { projectValue } = useProject();
  const { getTimeLogData } = useTimeLog();

  const handleDelete = async (id) => {
    const data = await deleteTask(id);
    dispatchTask({
      type: "deleted",
      id: data,
    });
    await getTaskData();
    await getTimeLogData();
  };

  return (
    <>
      <Container>
        {taskValue.tasks ? (
          taskValue.tasks.map((t) => (
            <Container key={t.id}>
              <Box>
                {projectValue.projects
                  .filter((p) => p.id === t.projectId)
                  .map((p) => (
                    <Box key={p.id} style={{ display: "inline" }}>
                      <Icon
                        as={MdOutlineColorLens}
                        w={25}
                        h={25}
                        style={{
                          backgroundColor: p.color,
                        }}
                      />
                      <Heading style={{ display: "inline", padding: 25 }}>
                        {t.name}
                      </Heading>
                    </Box>
                  ))}
                <Button variant="link" onClick={() => handleDelete(t.id)}>
                  <Icon as={RiDeleteBack2Line} w={25} h={25} />
                </Button>
                <Divider />
                <br />
              </Box>
            </Container>
          ))
        ) : (
          <Box>
            <Heading>No tasks found</Heading>
          </Box>
        )}
        <br />
        <Button colorScheme="blue" onClick={onOpen}>
          Add new Tasks
        </Button>
        {isOpen && <AddTask isOpen={isOpen} onClose={onClose} />}
      </Container>
    </>
  );
}

export default Tasks;
