import { useContext } from "react";
import styled from "styled-components";
import { PlaylistContext } from "../../context/playlistContext/PlayListContext";

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

const PlayListimage = styled.img`
  max-height: 6em;
  width: auto;
`;

type PlaylistCardProps = {
  playlist: PlaylistType;
};

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  const { addSongToPlaylist, songForPlaylist } = useContext(PlaylistContext);
  console.log(songForPlaylist);

  if (songForPlaylist && songForPlaylist.id)
    return (
      <PlaylistCardContainer
        key={playlist.id}
        onClick={() =>
          addSongToPlaylist(
            songForPlaylist.id,
            songForPlaylist.image,
            playlist.id,
            playlist.playlistName
          )
        }
      >
        <PlayListimage
          src={playlist.image}
          alt={playlist.playlistName}
        />
        <PlaylistName>{playlist.playlistName}</PlaylistName>
      </PlaylistCardContainer>
    );
};
export default PlaylistCard;
