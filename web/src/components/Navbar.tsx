import React from "react";
import { Box, Link, Button, Flex, useColorMode } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { MenuDrawer } from "./MenuDrawer";
import { HomeButton } from "./HomeButton";

interface NavbarProps {
  defaultColor: string;
}

export const Navbar: React.FC<NavbarProps> = ({ defaultColor }) => {
  const spacing = 5;
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
        <NextLink href="/">
          <Link mr={spacing}>Home</Link>
        </NextLink>
        <NextLink href="/posts">
          <Link mr={spacing}>Posts</Link>
        </NextLink>
        <NextLink href="/login">
          <Link mr={spacing}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link mr={spacing}>Register</Link>
        </NextLink>
      </Flex>
    );
  } else {
    body = (
      <Flex justify="flex-end" mr={spacing} alignItems="center">
        <NextLink href="/">
          <Link mr={spacing}>Home</Link>
        </NextLink>
        <NextLink href="/posts">
          <Link mr={spacing}>Posts</Link>
        </NextLink>
        <Box mr={spacing}>{data.me.username}</Box>
        <Button
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
      p={4}
      width="100%"
    >
      <HomeButton defaultColor={defaultColor} />
      <MenuDrawer defaultColor={defaultColor} />
      <Flex justifyContent="flex-end" ml="auto">
        {body}
        <DarkModeSwitch defaultColor={defaultColor} />
      </Flex>
    </Flex>
  );
};

export default Navbar;
