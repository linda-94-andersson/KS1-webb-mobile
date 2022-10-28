import React from "react";
import { useUser, useUserDispatch } from "../context/UserContext";
import { useProject } from "../context/ProjectContext";
import { useTask } from "../context/TaskContext";
import { useTimeLog } from "../context/TimeLogContext";
import { deleteUser } from "../data/getUsers";
import AddUser from "./AddUser";
import {
  Container,
  Box,
  Heading,
  Button,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { RiDeleteBack2Line } from "react-icons/ri";

function User() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { userValue, getUserData } = useUser();
  const { dispatch } = useUserDispatch();
  const { getProjectData } = useProject();
  const { getTaskData } = useTask();
  const { getTimeLogData } = useTimeLog();

  const handleDelete = async (id) => {
    const data = await deleteUser(id);
    dispatch({
      type: "deleted",
      id: data,
    });
    await getUserData();
    await getProjectData();
    await getTaskData();
    await getTimeLogData();
  };

  return (
    <>
      <Container>
        {userValue.users ? (
          userValue.users.map((u) => (
            <Container key={u.id}>
              <Box>
                <Heading style={{ display: "inline", paddingRight: 25 }}>
                  {u.name}
                </Heading>
                <Button variant="link" onClick={() => handleDelete(u.id)}>
                  <Icon as={RiDeleteBack2Line} w={25} h={25} />
                </Button>
              </Box>
              <Divider />
              <br />
            </Container>
          ))
        ) : (
          <Box>
            <Heading>No users found</Heading>
          </Box>
        )}
        <br />
        <Button colorScheme="blue" onClick={onOpen}>
          Add new user
        </Button>
        {isOpen && <AddUser isOpen={isOpen} onClose={onClose} />}
      </Container>
    </>
  );
}

export default User;
