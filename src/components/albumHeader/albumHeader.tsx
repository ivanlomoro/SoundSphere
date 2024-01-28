import styled from "styled-components";
import { Album } from "../../pages/AddMusicPage";
import { FC } from "react";
import { Artist } from "../../Types/SongsTypes";
import { PlaylistType } from "../../interfaces/PlaylistType";

const AlbumHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--clr-bg-primary);
  padding: var(--fs-md);
`;

const AlbumImage = styled.img`
  width: 30%;
  height: auto;
  border-radius: 5%;
`;

type AlbumProps = {
  album: Album;
};

export const AlbumHeader: FC<AlbumProps> = ({ album }) => {
  const { name, thumbnail, Artist, Genre } = album;

  return (
    <AlbumHeaderContainer>
      <AlbumImage src={thumbnail} alt={name} />
      <h2>{name}</h2>
      <h2>{Artist.name}</h2>
      <h3>{Genre?.name}</h3>
    </AlbumHeaderContainer>
  );
};
type ArtistProps = {
  artist: Artist;
};

export const ArtistHeader: FC<ArtistProps> = ({ artist }) => {
  const { name, thumbnail } = artist;

  return (
    <AlbumHeaderContainer>
      <AlbumImage src={thumbnail} alt={name} />
      <h2>{name}</h2>
    </AlbumHeaderContainer>
  );
};

type PlaylistProps = {
  playlist: PlaylistType;
};

export const PlaylistHeader: FC<PlaylistProps> = ({ playlist }) => {
  const { playlistName, thumbnail } = playlist;

  return (
    <AlbumHeaderContainer>
      <AlbumImage src={thumbnail} alt={playlistName} />
      <h2>{playlistName}</h2>
    </AlbumHeaderContainer>
  );
};
