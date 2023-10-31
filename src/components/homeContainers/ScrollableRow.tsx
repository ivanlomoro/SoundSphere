import React, { ReactNode } from "react";
import styled from "styled-components";

const ScrollableRow = styled.ul`
  display: flex;
  padding-inline-start: 0px;
  width: 95vw;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  -ms-overflow-style: none;
`;

interface ScrollableRowProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

export const ScrollableRowComponent: React.FC<ScrollableRowProps> = ({
  children,
}) => {
  return <ScrollableRow>{children}</ScrollableRow>;
};
