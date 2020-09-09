import React from "react";
import { Link, Button, Flex, useColorMode, Box } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { HomeButton } from "./HomeButton";
import LogoutModal from "./LogoutModal";

interface TestNavbarProps {
  defaultColor: string;
}

export const TestNavbar: React.FC<TestNavbarProps> = ({ defaultColor }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "#171923" };
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  let body = null;
  if (loading) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <>
        <LogoutModal defaultColor={defaultColor} />
      </>
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
        <NextLink href="/posts">
          <Link mx={2}>Posts</Link>
        </NextLink>
        {body}
        <DarkModeSwitch defaultColor={defaultColor} />
      </Flex>
    </Flex>
  );
};

export default TestNavbar;
