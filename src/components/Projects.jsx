import React, { useState } from "react";
import { useProject, useProjectDisptach } from "../context/ProjectContext";
import { useTask } from "../context/TaskContext";
import { useTimeLog } from "../context/TimeLogContext";
import { deleteProject } from "../data/getProjects";
import AddProject from "./AddProject";
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

function Projects() {
  const [validColor, setValidColor] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { projectValue, getProjectData } = useProject();
  const { dispatch } = useProjectDisptach();
  const { getTaskData } = useTask();
  const { getTimeLogData } = useTimeLog();

  const handleDelete = async (id) => {
    const data = await deleteProject(id);
    dispatch({
      type: "deleted",
      id: data,
    });
    await getProjectData();
    await getTaskData();
    await getTimeLogData();
  };

  return (
    <>
      <Container>
        {!validColor && (
          <Center style={{ paddingBottom: 25 }}>
            <Text>Please use a diffrent color</Text>
          </Center>
        )}
        {projectValue.projects ? (
          projectValue.projects.map((p) => (
            <Container key={p.id}>
              <Box>
                <Icon
                  as={MdOutlineColorLens}
                  w={25}
                  h={25}
                  style={{
                    backgroundColor: p.color,
                  }}
                />
                <Heading style={{ display: "inline", padding: 25 }}>
                  {p.name}
                </Heading>
                <Button variant="link" onClick={() => handleDelete(p.id)}>
                  <Icon as={RiDeleteBack2Line} w={25} h={25} />
                </Button>
                <Divider />
                <br />
              </Box>
            </Container>
          ))
        ) : (
          <Box>
            <Heading>No projects found</Heading>
          </Box>
        )}
        <br />
        <Button colorScheme="blue" onClick={onOpen}>
          Add new project
        </Button>
        {isOpen && (
          <AddProject
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

export default Projects;
