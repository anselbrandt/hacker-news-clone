import React, { useState } from "react";
import { Wrapper } from "../components/Wrapper";
import { Formik, Form } from "formik";
import { Box, Button, Link } from "@chakra-ui/core";
import { InputField } from "../components/InputField";
import { useForgotPasswordMutation } from "../generated/graphql";
import NextLink from "next/link";
import { withApollo } from "../utils/withApollo";
import { Layout } from "../components/Layout";

interface ForgotPasswordProps {
  defaultColor: String;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ defaultColor }) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  return (
    <Layout>
      <Wrapper variant="small">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            await forgotPassword({ variables: values });
            setComplete(true);
          }}
        >
          {({ isSubmitting }) =>
            complete ? (
              <Box mt={20}>
                <Box>
                  If an account with that email exists, you will receive an
                  email.
                </Box>
                <Box mt={20}>
                  <NextLink href="/">
                    <Link>Home</Link>
                  </NextLink>
                </Box>
              </Box>
            ) : (
              <Form>
                <Box mt={4}>
                  <InputField name="email" placeholder="email" label="Email" />
                </Box>
                <Box mt={4}>
                  <Button
                    type="submit"
                    variantColor={defaultColor}
                    isLoading={isSubmitting}
                  >
                    forgot password
                  </Button>
                </Box>
              </Form>
            )
          }
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);
