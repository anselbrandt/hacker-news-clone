import React from "react";
import { Link, Flex, useColorMode, Box } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { HomeButton } from "./HomeButton";
import LogoutModal from "./LogoutModal";
import MenuDrawer from "./MenuDrawer";

interface NavbarProps {
  defaultColor: string;
}

export const Navbar: React.FC<NavbarProps> = ({ defaultColor }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "#171923" };
  const { data } = useMeQuery({
    skip: isServer(),
  });
  let body = null;
  if (!data?.me) {
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
        <LogoutModal defaultColor={defaultColor} label={data.me.username} />
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
      <Flex
        justifyContent="flex-end"
        alignItems="center"
        ml="auto"
        mr={2}
        display={["none", "flex", "flex", "flex"]}
      >
        <NextLink href="/posts">
          <Link mx={2}>Posts</Link>
        </NextLink>
        {body}
        <DarkModeSwitch defaultColor={defaultColor} />
      </Flex>
      <Flex
        justifyContent="flex-end"
        alignItems="center"
        ml="auto"
        mr={2}
        display={["flex", "none", "none", "none"]}
      >
        <MenuDrawer defaultColor={defaultColor}>
          <Box>
            <NextLink href="/posts">
              <Link mx={2}>Posts</Link>
            </NextLink>
          </Box>
          <Box mt={4}>
            <DarkModeSwitch defaultColor={defaultColor} />
          </Box>
        </MenuDrawer>
      </Flex>
    </Flex>
  );
};

export default Navbar;
