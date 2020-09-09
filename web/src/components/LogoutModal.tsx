import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/core";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useApolloClient } from "@apollo/client";

interface LogoutModalProps {
  defaultColor: string;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ defaultColor }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data } = useMeQuery({
    skip: isServer(),
  });
  return (
    <>
      <Button
        mx={2}
        onClick={onOpen}
        variantColor={defaultColor}
        variant="ghost"
      >
        {data?.me?.username}
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
    </>
  );
};

export default LogoutModal;
