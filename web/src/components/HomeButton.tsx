import React from "react";
import { Heading, Box } from "@chakra-ui/core";

interface HomeButtonProps {
  defaultColor: string;
}

export const HomeButton: React.FC<HomeButtonProps> = ({ defaultColor }) => {
  return (
    <Box color={defaultColor} mr={2}>
      <Heading size="2xl" fontWeight="extrabold">
        ab
      </Heading>
    </Box>
  );
};
