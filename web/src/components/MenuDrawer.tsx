import React, { useRef } from "react";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Box,
  useDisclosure,
} from "@chakra-ui/core";

interface MenuDrawerProps {
  defaultColor: string;
  title: string;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  children,
  title,
  defaultColor,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <Box>
      {" "}
      <Button ref={btnRef} variantColor={defaultColor} onClick={onOpen}>
        {title}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Drawer</DrawerHeader>

          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
