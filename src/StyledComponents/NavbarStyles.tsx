import styled from 'styled-components';


export const Nav = styled.nav`
  max-width: 100vw;
  background-color: #1E1E1E;
  border-bottom: #D6D6D6 1px solid;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  position: sticky;  // or "fixed"
  top: 0;
  z-index: 1000;  // This will put it on top of everything else
`;

export const P = styled.p`
  color: #D6D6D6;
`;
