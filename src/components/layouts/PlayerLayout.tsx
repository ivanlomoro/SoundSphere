import { Outlet } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";
import styled from "styled-components";
import { useContext } from "react";
import { PlaylistContext } from "../../context/playlistContext/PlayListContext";
import AddToPlayList from "../../pages/AddToPlaylist";
import Player from "../player/Player";
import { PlayerContext } from "../../context/playerContext/playerContext";

const StyledNavLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

export const PlayerLayout = () => {
  const { songForPlaylist } = useContext(PlaylistContext);
  const { isExpanded } = useContext(PlayerContext);

  return (
    <StyledNavLayout>
      <div>
        <Outlet />
      </div>
      {songForPlaylist && <AddToPlayList />}

      <Player />
      {!isExpanded && <NavBar />}
    </StyledNavLayout>
  );
};
