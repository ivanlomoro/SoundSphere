import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";

export const GridCard = styled.li`
  height: 15vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #6a6a6a;
  color: white;
  border-radius: 10px;
  margin: 10px;
  user-select: none;
`;

export const FavoriteButton = styled.button`
  position: relative;
  height: 30px;
  width: 30px;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;

  &:hover ${AiOutlineHeart} {
    color: var(--clr-accent);
  }
`;

export const GridCardImage = styled.img`
  width: 15vw;
  border-radius: 8px;
`;

export const GridCardDescription = styled.div`
  padding: 0.4rem;
  position: relative;
  width: 25vw;
  height: 15vw;
`;
export const SongName = styled.h3`
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;
export const SongArtist = styled.p`
  white-space: nowrap;
  overflow: hidden;
  width: 20vw;
  text-overflow: ellipsis;
  color: #aaaaaa;
  font-size: 0.5rem;
  margin: 0;
`;

type Songs = {
  id: number;
  name: string;
  artist: string;
  url: string;
  thumbnail: string;
  genre: string;
  liked: boolean;
};
export type SongCardProps = {
  song: Songs;
  toggleFavorite: (song: Songs) => void;
  isFavorite: (id: number) => boolean;
  addToRecents: (song: Songs) => void;
};
