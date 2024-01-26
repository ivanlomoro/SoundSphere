import styled from "styled-components";
import { Album } from "../../pages/AddMusicPage";
import { FC } from "react";

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

type Props = {
  album: Album;
};

export const AlbumHeader: FC<Props> = ({ album }) => {
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
