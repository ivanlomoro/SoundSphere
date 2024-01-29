import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import styled from "styled-components";

const StyledNavLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

export const NavLayout = () => {
  return (
    <StyledNavLayout>
      <div>
        <Outlet />
      </div>
      <NavBar isNavLayout={true} />
    </StyledNavLayout>
  );
};
