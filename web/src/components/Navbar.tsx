import React from "react";
import { Box, Link, Button, Flex, useColorMode } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "black", dark: "white" };
  const color = { light: "white", dark: "black" };

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
          <Link mr={10}>Home</Link>
        </NextLink>
        <NextLink href="/posts">
          <Link mr={10}>Posts</Link>
        </NextLink>
        <NextLink href="/login">
          <Link mr={10}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link mr={10}>Register</Link>
        </NextLink>
      </Flex>
    );
  } else {
    body = (
      <Flex justify="flex-end" mr={10}>
        <NextLink href="/">
          <Link mr={10}>Home</Link>
        </NextLink>
        <NextLink href="/posts">
          <Link mr={10}>Posts</Link>
        </NextLink>
        <Box mr={10}>{data.me.username}</Box>
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
    <Box
      position="sticky"
      top={0}
      zIndex={1}
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      p={4}
    >
      {body}
    </Box>
  );
};

export default Navbar;
