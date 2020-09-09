import React from "react";
import {
  Link,
  Button,
  Flex,
  useColorMode,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
} from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { HomeButton } from "./HomeButton";

interface TestNavbarProps {
  defaultColor: string;
}

export const TestNavbar: React.FC<TestNavbarProps> = ({ defaultColor }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "#171923" };
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  let body = null;
  if (loading) {
  } else if (!data?.me) {
    body = (
      <Flex justify="flex-end">
        <NextLink href="/posts">
          <Link>Posts</Link>
        </NextLink>
        <NextLink href="/login">
          <Link>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </Flex>
    );
  } else {
    body = (
      <Flex justify="flex-end" alignItems="center">
        <NextLink href="/posts">
          <Link mx={2}>Posts</Link>
        </NextLink>
        <Button
          mx={2}
          onClick={onOpen}
          variantColor={defaultColor}
          variant="ghost"
        >
          {data.me.username}
        </Button>

        <Modal isOpen={isOpen} onClose={onClose} size={"xs"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>Do you want to logout?</ModalBody>

            <ModalFooter>
              <Button
                variantColor={defaultColor}
                onClick={async () => {
                  await logout();
                  await apolloClient.resetStore();
                  await onClose();
                }}
                isLoading={logoutFetching}
              >
                Logout
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    );
  }
  return (
    <Flex
      direction="row"
      alignItems="center"
      position="sticky"
      top={0}
      zIndex={1}
      bg={bgColor[colorMode]}
      width="100vw"
    >
      <Box m={2}>
        <HomeButton defaultColor={defaultColor} />
      </Box>
      <Flex justifyContent="flex-end" alignItems="center" ml="auto" mr={2}>
        {body}
        <DarkModeSwitch defaultColor={defaultColor} />
      </Flex>
    </Flex>
  );
};

export default TestNavbar;
