import React from "react";
import { Box, Link, Button, Flex, useColorMode } from "@chakra-ui/core";
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
        <Box m={4}>{data.me.username}</Box>
        <Button
          m={4}
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          Logout
        </Button>
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
