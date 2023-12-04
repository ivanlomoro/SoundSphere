import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import styled from "styled-components";
import { MiniPlayer } from "../Miniplayer/MiniPlayer";

const StyledNavLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

const StickySections = styled.div`
  position: sticky;
  bottom: 0;
`;

export const PlayerLayout = () => {
  return (
    <StyledNavLayout>
      <div>
        <Outlet />
      </div>
      <StickySections>
        <MiniPlayer />
        <NavBar />
      </StickySections>
    </StyledNavLayout>
  );
};
