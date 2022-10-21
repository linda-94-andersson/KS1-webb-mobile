import React from "react";
import { useUser } from "../context/UserContext";
import {
  Center,
  Heading,
  Container,
  Box,
  Divider,
  Text,
  Flex,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { AiOutlinePlaySquare } from "react-icons/ai";

function Timer() {
  const { userValue } = useUser();

  return (
    <>
      <header style={{ paddingBottom: 10 }}>
        <Center style={{ paddingBottom: 50 }}>
          <Heading as="h1" size="3xl">
            Timer
          </Heading>
        </Center>
        <Center>
          <Heading as="h2" size="2xl">
            Aktuell timer
          </Heading>
        </Center>
        <Center style={{ paddingBottom: 50 }}>
          <Heading as="h3" size="lg">
            Aktuell timer projekt namn
          </Heading>
        </Center>
        <Container>
          <Flex>
            <Box p="4">
              <Heading as="h4" size="md">
                total
              </Heading>
              <Text>timer</Text>
            </Box>
            <Spacer />
            <Box p="4">
              <Heading as="h4" size="md">
                today
              </Heading>
              <Text>timer</Text>
            </Box>
          </Flex>
        </Container>
        <Divider />
      </header>
      <Container style={{ marginBottom: 150 }}>
        <Box>
          <Heading as="h2" size="md">
            datum
          </Heading>
          <Container>
            <Box>
              {userValue.user ? (
                userValue.user.map((u) => (
                  <Box key={u.id}>
                    <Heading as="h3" size="md">
                      {u.name}
                    </Heading>
                  </Box>
                ))
              ) : (
                <Container>No users found</Container>
              )}
            </Box>
            <Heading as="h4" size="lg" style={{ display: "inline" }}>
              tasks
            </Heading>
            <Button variant="link">
              <Icon as={AiOutlinePlaySquare} w={250} h={25} />
            </Button>
            <Heading as="h4" size="md">
              timer
            </Heading>
            <Divider />
            <br />
          </Container>
        </Box>
      </Container>
    </>
  );
}

export default Timer;
