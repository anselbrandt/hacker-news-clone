import { Link as ChakraLink, Button } from "@chakra-ui/core";

import { Container } from "./Container";

export const CTA = (props) => {
  const { mainColor } = props;
  return (
    <Container
      flexDirection="row"
      position="fixed"
      bottom="0"
      width="100%"
      maxWidth="48rem"
      py={2}
    >
      <ChakraLink isExternal href="https://anselbrandt.com" flexGrow={1} mx={2}>
        <Button width="100%" variant="outline" variantColor={mainColor}>
          contact
        </Button>
      </ChakraLink>

      <ChakraLink
        isExternal
        href="https://github.com/anselbrandt/hacker-news-clone"
        flexGrow={3}
        mx={2}
      >
        <Button width="100%" variant="solid" variantColor={mainColor}>
          view code
        </Button>
      </ChakraLink>
    </Container>
  );
};
