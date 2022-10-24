import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import InputColor from "react-input-color";
import { useProject, useProjectDisptach } from "../context/ProjectContext";
import { useUser } from "../context/UserContext";
import { addProject } from "../data/getProjects";
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

function AddProject({ isOpen, onClose, setValidColor }) {
  const [input, setInput] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [color, setColor] = useState({});

  const { userValue } = useUser();
  const { projectValue, getProjectData } = useProject();
  const { dispatch } = useProjectDisptach();

  const generated_id = uuid();

  const handleSelectedUser = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleInputProject = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    if (!input || !selectedUser) return;
    if (
      projectValue.projects.find((p) => p.color === color.hex) &&
      projectValue.projects.find((p) => p.userId === selectedUser)
    ) {
      return setValidColor(false);
    }

    setValidColor(true);

    const data = await addProject(generated_id, input, color.hex, selectedUser);
    dispatch({
      type: "added",
      id: data.id,
      name: data.name,
      color: data.color,
      userId: data.userId,
    });
    await getProjectData();
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
                name="users"
                id="users"
                value={selectedUser}
                onChange={handleSelectedUser}
              >
                <option value="">Pick a user</option>
                {userValue.users ? (
                  userValue.users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))
                ) : (
                  <option value="">No users found</option>
                )}
              </Select>
              <br />
              <FormLabel></FormLabel>
              <Input
                required
                type="text"
                name="projectName"
                placeholder="Project name"
                onChange={handleInputProject}
              />
              <br />
              <Center style={{ paddingTop: 15 }}>
                <InputColor
                  initialValue="#5e72e4"
                  onChange={setColor}
                  placement="left"
                />
                <FormLabel style={{ marginLeft: 10 }}>Pick a color</FormLabel>
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
                  Add project
                </Button>
              </Center>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddProject;
