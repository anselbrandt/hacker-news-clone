import React from "react";
import {
  Link as ChakraLink,
  Text,
  Code,
  Icon,
  List,
  ListIcon,
  ListItem,
  Link,
  Box,
} from "@chakra-ui/core";
import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { usePostsQuery } from "../generated/graphql";
import NextLink from "next/link";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  const mainColor = "purple";
  const { data, loading } = usePostsQuery({
    variables: {
      limit: 10,
    },
  });

  return (
    <React.Fragment>
      <Navbar />
      <Container>
        <Hero />
        <Main>
          <Text>
            Building the future with <Code>React.js</Code> +{" "}
            <Code>Node.js</Code> + <Code>TypeScript</Code>.
          </Text>

          <List spacing={3} my={0}>
            <ListItem>
              <ListIcon icon="check-circle" color={`${mainColor}.500`} />
              <ChakraLink
                isExternal
                href="https://anselbrandt.com"
                flexGrow={1}
                mr={2}
              >
                About <Icon name="external-link" mx="2px" />
              </ChakraLink>
            </ListItem>
            <ListItem>
              <ListIcon icon="check-circle" color={`${mainColor}.500`} />
              <ChakraLink
                isExternal
                href="https://anselbrandt.com"
                flexGrow={1}
                mr={2}
              >
                Projects <Icon name="external-link" mx="2px" />
              </ChakraLink>
            </ListItem>
            <ListItem>
              <ListIcon icon="check-circle" color={`${mainColor}.500`} />
              <ChakraLink
                isExternal
                href="https://anselbrandt.com"
                flexGrow={1}
                mr={2}
              >
                Skills <Icon name="external-link" mx="2px" />
              </ChakraLink>
            </ListItem>
          </List>
        </Main>
        <br />
        {!data && loading ? (
          <div>loading...</div>
        ) : (
          <>
            <Box justifyContent="start">
              {data!.posts.posts.slice(0, 9).map((p) =>
                !p ? null : (
                  <Box key={p.id} mb={2}>
                    <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                      <Link>{p.title}</Link>
                    </NextLink>
                  </Box>
                )
              )}
            </Box>
          </>
        )}
        {data && !loading ? (
          <Box mt={4}>
            <NextLink href="/posts">
              <Link mr={10}>More Articles</Link>
            </NextLink>
          </Box>
        ) : null}
        <Footer>
          <Text>© Ansel Brandt 2020</Text>
        </Footer>
        <CTA mainColor={mainColor} />
      </Container>
    </React.Fragment>
  );
};

export default withApollo({ ssr: true })(Index);
