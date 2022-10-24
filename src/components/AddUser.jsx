import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useUser, useUserDispatch } from "../context/UserContext";
import { addUser } from "../data/getUsers";
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
} from "@chakra-ui/react";

function AddUser({ isOpen, onClose }) {
  const [input, setInput] = useState("");

  const { getUserData } = useUser();
  const { dispatch } = useUserDispatch();

  const generated_id = uuid();

  const handleInputUser = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;
    const data = await addUser(generated_id, input);
    dispatch({
      type: "added",
      id: data.id,
      name: data.name,
    });
    await getUserData();
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
              <Input
                required
                type="text"
                name="userName"
                placeholder="User name"
                onChange={handleInputUser}
              />
              <Center style={{ paddingTop: 15 }}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                    onClose();
                  }}
                >
                  Add User
                </Button>
              </Center>
              <br />
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddUser;
