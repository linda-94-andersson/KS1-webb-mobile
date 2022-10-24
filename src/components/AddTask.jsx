import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useTask, useTaskDispatch } from "../context/TaskContext";
import { useProject } from "../context/ProjectContext";
import { addTask } from "../data/getTasks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  Button,
  Heading,
  Center,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { MdOutlineColorLens } from "react-icons/md";

function AddTask({ isOpen, onClose }) {
  const [input, setInput] = useState();
  const [selectProject, setSelectedProject] = useState();

  const { projectValue } = useProject();
  const { getTaskData } = useTask();
  const { dispatchTask } = useTaskDispatch();

  const generated_id = uuid();

  const handleSelectProject = (e) => {
    setSelectedProject(e.target.value);
  };

  const handleInputTask = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    if (!input || !selectProject) return;
    const data = await addTask(generated_id, input, Date.now(), selectProject);
    dispatchTask({
      type: "added",
      id: data.id,
      name: data.name,
      createdDate: data.createdDate,
      projectId: data.projectId,
    });
    await getTaskData();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <Center>
            <ModalHeader>
              <Heading>Add</Heading>
            </ModalHeader>
          </Center>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel></FormLabel>
              <Select
                required
                name="projects"
                id="projects"
                value={selectProject}
                onChange={handleSelectProject}
              >
                <option value="">Pick a project</option>
                {projectValue.projects ? (
                  projectValue.projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))
                ) : (
                  <option value="">No projects found</option>
                )}
              </Select>
              <br />
              <FormLabel></FormLabel>
              <Input
                required
                type="text"
                name="taskName"
                placeholder="Task name"
                onChange={handleInputTask}
              />
              <br />
              <Center style={{ paddingTop: 15 }}>
                {projectValue.projects ? (
                  projectValue.projects
                    .filter((p) => p.id === selectProject)
                    .map((p) => (
                      <Icon
                        as={MdOutlineColorLens}
                        w={25}
                        h={25}
                        key={p.id}
                        style={{
                          backgroundColor: p.color,
                        }}
                      ></Icon>
                    ))
                ) : (
                  <div></div>
                )}
              </Center>
              <br />
              <Center>
                <Button
                  type="submit"
                  colorScheme="blue"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                    onClose();
                  }}
                >
                  Add task
                </Button>
              </Center>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddTask;
