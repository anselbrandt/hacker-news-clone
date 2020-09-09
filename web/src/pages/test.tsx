import React from "react";
import { TestLayout } from "../components/TestLayout";
import { withApollo } from "../utils/withApollo";

interface TestProps {
  defaultColor: string;
}

const Test: React.FC<TestProps> = ({ defaultColor }) => {
  return <TestLayout defaultColor={defaultColor}>Test</TestLayout>;
};

export default withApollo({ ssr: false })(Test);
