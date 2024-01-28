import { HeaderSection } from "../components";
import { useContext } from "react";
import { PlaylistContext } from "../context/playlistContext/PlayListContext";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { FAVORITESONGSPAGE } from "../routes/paths";

const PlaylistCardContainer = styled.div`
  display: flex;
  max-height: 10em;
  align-items: center;
  gap: 1em;
  color: #fff;
  cursor: pointer; // Add cursor pointer to make it clickable
  margin-top: 4em;
  margin-left: 2em;
`;

const PlaylistName = styled.div`
  font-size: var(--fs-lg);
`;

const PlayListThumbnail = styled.img`
  max-height: 6em;
  width: auto;
`;

const FavoritePlaylist = () => {
  const { userPlaylists } = useContext(PlaylistContext);
  const navigate = useNavigate();

  const hardcodedPlaylist = {
    id: "1",
    thumbnail: "https://picsum.photos/300/300",
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

      <NavLink to={FAVORITESONGSPAGE}>
        {" "}
        <PlaylistCardContainer key={hardcodedPlaylist.id}>
          <PlayListThumbnail
            src={hardcodedPlaylist.thumbnail}
            alt={hardcodedPlaylist.playlistName}
          />
          <PlaylistName>{hardcodedPlaylist.playlistName}</PlaylistName>
        </PlaylistCardContainer>{" "}
      </NavLink>

      {/* User playlists */}
      {userPlaylists?.map((playlist) => (
        <PlaylistCardContainer
          key={playlist.id}
          onClick={() => handlePlaylistClick(playlist.id)}
        >
          <PlayListThumbnail
            src={playlist.thumbnail}
            alt={playlist.playlistName}
          />
          <PlaylistName>{playlist.playlistName}</PlaylistName>
        </PlaylistCardContainer>
      ))}
    </>
  );
};

export default FavoritePlaylist;
