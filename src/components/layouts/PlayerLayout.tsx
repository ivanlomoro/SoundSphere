import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import styled from "styled-components";
import { MiniPlayer } from "../Miniplayer/MiniPlayer";
import { useContext } from "react";
import { PlaylistContext } from "../../context/playlistContext/PlayListContext";
import AddToPlayList from "../../pages/AddToPlaylist";

const StyledNavLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

const StickySections = styled.div`
  position: sticky;
  bottom: 0;
  background-color: #111111c2;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 1)
  );
  backdrop-filter: blur(6px);
`;

export const PlayerLayout = () => {
  const { songForPlaylist } = useContext(PlaylistContext);

  return (
    <StyledNavLayout>
      <div>
        <Outlet />
      </div>
      {songForPlaylist && <AddToPlayList />}
      <StickySections>
        <MiniPlayer />
        <NavBar />
      </StickySections>
    </StyledNavLayout>
  );
};
