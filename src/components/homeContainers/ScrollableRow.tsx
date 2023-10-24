import React, { ReactNode } from 'react';
import styled from 'styled-components';

// Styled component for the horizontal-scrolling row
const ScrollableRow = styled.ul`
  display: flex;
  padding-inline-start: 0px;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  -ms-overflow-style: none;
`;

// Define a type for the component props
interface ScrollableRowProps {
  children: ReactNode;
}

// Main Component
export const ScrollableRowComponent: React.FC<ScrollableRowProps> = ({ children }) => {
  return <ScrollableRow>{children}</ScrollableRow>;
};


