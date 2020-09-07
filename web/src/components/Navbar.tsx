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
} from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { HomeButton } from "./HomeButton";

interface NavbarProps {
  defaultColor: string;
}

export const Navbar: React.FC<NavbarProps> = ({ defaultColor }) => {
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
          <Link m={4}>Posts</Link>
        </NextLink>
        <NextLink href="/login">
          <Link m={4}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link m={4}>Register</Link>
        </NextLink>
      </Flex>
    );
  } else {
    body = (
      <Flex justify="flex-end" alignItems="center">
        <NextLink href="/posts">
          <Link m={4}>Posts</Link>
        </NextLink>
        <Button
          onClick={onOpen}
          mr={3}
          variantColor={defaultColor}
          variant="ghost"
        >
          {data.me.username}
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>Do you want to logout?</ModalBody>

            <ModalFooter>
              <Button
                variantColor={defaultColor}
                mr={3}
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
      p={1}
      width="100%"
    >
      <HomeButton defaultColor={defaultColor} />
      <Flex justifyContent="flex-end" alignItems="center" ml="auto">
        {body}
        <DarkModeSwitch defaultColor={defaultColor} />
      </Flex>
    </Flex>
  );
};

export default Navbar;
