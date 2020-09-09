import React from "react";
import TestNavbar from "./TestNavbar";
import { Flex, Box } from "@chakra-ui/core";

interface TestLayoutProps {
  defaultColor: string;
  w?:
    | string
    | number
    | (string | number | null)[]
    | {
        [key: string]: React.ReactText;
      }
    | undefined;
}

export const TestLayout: React.FC<TestLayoutProps> = ({
  children,
  defaultColor,
  w,
}) => {
  return (
    <>
      <TestNavbar defaultColor={defaultColor} />
      <Flex justifyContent="center">
        <Box w={w ? w : "800"} p={2}>
          {children}
        </Box>
      </Flex>
    </>
  );
};
