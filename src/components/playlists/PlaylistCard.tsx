import { useContext } from "react";
import styled from "styled-components";
import { PlaylistContext } from "../../context/playlistContext/PlayListContext";
import { PlaylistType } from "../../interfaces/PlaylistType";

const PlaylistCardContainer = styled.div`
  display: flex;
  max-height: 10em;
  align-items: center;
  gap: 1em;
  color: #fff;
`;

const PlaylistName = styled.div`
  font-size: var(--fs-lg);
`;

const PlayListThumbnail = styled.img`
  max-height: 6em;
  width: auto;
`;

type PlaylistCardProps = {
  playlist: PlaylistType;
};

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  const { addSongToPlaylist, songForPlaylist } = useContext(PlaylistContext);

  if (songForPlaylist && songForPlaylist.id)
    return (
      <PlaylistCardContainer
        key={playlist.id}
        onClick={() =>
          addSongToPlaylist(
            songForPlaylist.id,
            songForPlaylist.thumbnail,
            playlist.id,
            playlist.playlistName
          )
        }
      >
        <PlayListThumbnail
          src={playlist.thumbnail}
          alt={playlist.playlistName}
        />
        <PlaylistName>{playlist.playlistName}</PlaylistName>
      </PlaylistCardContainer>
    );
};
export default PlaylistCard;
