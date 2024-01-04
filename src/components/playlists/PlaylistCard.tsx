import styled from "styled-components";

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
  console.log("this playlist", playlist);
  return (
    <PlaylistCardContainer key={playlist.id}>
      <PlayListThumbnail src={playlist.thumbnail} alt={playlist.playlistName} />
      <PlaylistName>{playlist.playlistName}</PlaylistName>
    </PlaylistCardContainer>
  );
};
export default PlaylistCard;
