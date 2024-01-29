import { HeaderSection } from "../components/header/Header";
import { useContext } from "react";
import { PlaylistContext } from "../context/playlistContext/PlayListContext";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FAVORITESONGSPAGE } from "../routes/paths";
import {
  CardImagePlaylist,
  CardPlaylist,
} from "../components/card/card.styled.components";

import { CardDescription } from "../components/card/card.styled.components";

const PlaylistName = styled.div`
  font-size: var(--fs-md);
  display: flex;
  justify-content: center;
`;

const AlbumsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1em;
  justify-items: center;
  min-width: 90%;
  width: 100%;
  overflow-x: hidden;
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FavoritePlaylist = () => {
  const { userPlaylists } = useContext(PlaylistContext);
  const navigate = useNavigate();

  const hardcodedPlaylist = {
    id: "1",
    thumbnail:
      "https://res.cloudinary.com/dnmoqsjh7/image/upload/v1706473262/assets/icono_sound_dgxm8g.png",
    playlistName: "Favorites",
  };

  const handlePlaylistClick = (playlistId: string) => {
    navigate(`/playlist/${playlistId}`);
  };

  return (
    <>
      <HeaderSection
        text="Library"
        withBackButton={true}
        arrowBackAction={() => navigate(-1)}
      />

      <AlbumsContainer>
        <StyledLink to={FAVORITESONGSPAGE}>
          <CardPlaylist>
            <CardImagePlaylist
              key={hardcodedPlaylist.playlistName}
              className="card-img"
              src={hardcodedPlaylist.thumbnail}
              alt={hardcodedPlaylist.playlistName}
            />
            <CardDescription>
              <PlaylistName>{hardcodedPlaylist.playlistName}</PlaylistName>
            </CardDescription>
          </CardPlaylist>
        </StyledLink>

        {userPlaylists?.map((playlist, index) => (
          <CardPlaylist
            key={index}
            onClick={() => handlePlaylistClick(playlist.id)}
          >
            <CardImagePlaylist
              className="card-img"
              src={playlist.thumbnail}
              alt={playlist.playlistName}
            />
            <CardDescription>
              <PlaylistName>{playlist.playlistName}</PlaylistName>
            </CardDescription>
          </CardPlaylist>
        ))}
      </AlbumsContainer>
    </>
  );
};

export default FavoritePlaylist;
