import React, { ReactNode } from 'react';
import styled from 'styled-components';

// Styled component for the horizontal-scrolling row
const ScrollableRow = styled.ul`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for Firefox */
  scrollbar-width: none;

  /* Hide scrollbar for IE and Edge */
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


