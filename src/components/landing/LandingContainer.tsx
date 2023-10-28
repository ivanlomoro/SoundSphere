import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  margin: 0;
  padding-inline: var(--space-xl);
  background-color: var(--clr-bg-primary);
  font-family: var(--ff-primary);
  color: var(--cl-text-secondary);
  text-align: center;
`;

type LandingContainerProps = {
  children: ReactNode;
};

export const LandingContainer = ({ children }: LandingContainerProps) => {
  return <Container>{children}</Container>;
};
