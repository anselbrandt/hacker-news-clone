import React from "react";
import { Wrapper, WrapperVariant } from "./Wrapper";
import Navbar from "./Navbar";

interface LayoutProps {
  variant?: WrapperVariant;
  defaultColor: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  variant,
  defaultColor,
}) => {
  return (
    <>
      <Navbar defaultColor={defaultColor} />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
