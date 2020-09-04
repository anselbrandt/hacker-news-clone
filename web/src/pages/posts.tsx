import React from "react";
import { Link, Stack, Heading, Box, Text, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { UpdootSection } from "../components/UpdootSection";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";
import { withApollo } from "../utils/withApollo";

const Posts: React.FC<{}> = ({}) => {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 10,
      cursor: null as null | string,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return (
      <Layout>
        <Flex justifyContent="center" mt={40}>
          <div>something went wrong</div>
          <div>{error?.message}</div>
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex align="center">
        <Heading>LiReddit</Heading>
        <NextLink href="/create-post">
          <Button as={Link} ml={"auto"}>
            create post
          </Button>
        </NextLink>
      </Flex>
      <br />
      {!data && loading ? (
        <div>loading...</div>
      ) : (
        <Stack>
          {data!.posts.posts.map((p) =>
            !p ? null : (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <UpdootSection post={p} />
                <Box flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text>{p.creator.username}</Text>
                  <Flex>
                    <Text mt={4}>{p.textSnippet}</Text>
                    <Box ml="auto">
                      <EditDeletePostButtons
                        id={p.id}
                        creatorId={p.creator.id}
                      />
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data?.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
                // updateQuery: (
                //   previousValue,
                //   { fetchMoreResult }
                // ): PostsQuery => {
                //   if (!fetchMoreResult) {
                //     return previousValue as PostsQuery;
                //   }
                //   return {
                //     __typename: "Query",
                //     posts: {
                //       __typename: "PaginatedPosts",
                //       hasMore: (fetchMoreResult as PostsQuery).posts.hasMore,
                //       posts: [
                //         ...(previousValue as PostsQuery).posts.posts,
                //         ...(fetchMoreResult as PostsQuery).posts.posts,
                //       ],
                //     },
                //   };
                // },
              });
            }}
            isLoading={loading}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Posts);
