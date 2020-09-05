import React from "react";
import { Layout } from "../../components/Layout";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { Flex, Heading, Box } from "@chakra-ui/core";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { withApollo } from "../../utils/withApollo";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const { data, loading } = useGetPostFromUrl();

  if (loading) {
    return <Layout>loading...</Layout>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Flex justifyContent="center" mt={40}>
          that doesn't seem to be here.
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex>
        <Box>
          <Heading mb={4}>{data.post.title}</Heading>
        </Box>
        <Box ml="auto">
          <EditDeletePostButtons
            id={data.post.id}
            creatorId={data.post.creator.id}
          />
        </Box>
      </Flex>
      <Box>{data.post.text}</Box>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
