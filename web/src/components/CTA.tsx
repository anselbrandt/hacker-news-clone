import { Link as ChakraLink, Button } from "@chakra-ui/core";

import { Container } from "./Container";

export const CTA = () => (
  <Container
    flexDirection="row"
    position="fixed"
    bottom="0"
    width="100%"
    maxWidth="48rem"
    py={2}
  >
    <ChakraLink isExternal href="https://anselbrandt.com" flexGrow={1} mx={2}>
      <Button width="100%" variant="outline" variantColor="green">
        contact
      </Button>
    </ChakraLink>

    <ChakraLink
      isExternal
      href="https://github.com/anselbrandt/li-reddit-client"
      flexGrow={3}
      mx={2}
    >
      <Button width="100%" variant="solid" variantColor="green">
        view code
      </Button>
    </ChakraLink>
  </Container>
);