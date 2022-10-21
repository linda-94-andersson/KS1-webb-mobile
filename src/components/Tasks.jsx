import React, { useState } from "react";
import { useProject } from "../context/ProjectContext";
import { useTask, useTaskDispatch } from "../context/TaskContext";
import { deleteTask } from "../data/getTasks";
import AddTask from "./AddTask";
import {
  Container,
  Box,
  Heading,
  Button,
  useDisclosure,
  Divider,
  Center,
  Text,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { MdOutlineColorLens } from "react-icons/md";
import { RiDeleteBack2Line } from "react-icons/ri";

function Tasks() {
  const [validColor, setValidColor] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { taskValue, getTaskData } = useTask();
  const { dispatch } = useTaskDispatch();
  const { projectValue } = useProject();

  const handleDelete = async (id) => {
    const data = await deleteTask(id);
    dispatch({
      type: "deleted",
      id: data,
    });
    await getTaskData();
  };

  return (
    <>
      <Container>
        {!validColor && (
          <Center style={{ paddingBottom: 25 }}>
            <Text>Please use a diffrent color</Text>
          </Center>
        )}
        {taskValue.task ? (
          taskValue.task.map((t) => (
            <Container key={t.id}>
              <Box>
                {projectValue.project
                  .filter((p) => p.id === t.projectId)
                  .map((c) => (
                    <Box key={c.id} style={{ display: "inline" }}>
                      <Icon
                        as={MdOutlineColorLens}
                        w={25}
                        h={25}
                        style={{
                          backgroundColor: c.color,
                        }}
                      ></Icon>
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
        {isOpen && (
          <AddTask
            isOpen={isOpen}
            onClose={onClose}
            validColor={validColor}
            setValidColor={setValidColor}
          />
        )}
      </Container>
    </>
  );
}

export default Tasks;
