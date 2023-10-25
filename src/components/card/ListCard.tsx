import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";

export const ListCard = styled.li`
  width: 90vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #6a6a6a;
  color: white;
  border-radius: 10px;
  margin: 2rem;
  margin-left: -2rem;
`;

export const FavoriteButton = styled.button`
  position: relative;
  height: 50px;
  width: 30px;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;

  &:hover ${AiOutlineHeart} {
    color: var(--clr-accent);
  }
`;

export const ListCardImage = styled.img`
  width: 25vw;
  border-radius: 8px;
  margin: 0.5rem;
`;

export const ListCardDescription = styled.div`
  padding: 0.4rem;
  position: relative;
  width: 75vw;
  height: 25vw;
`;
export const SongName = styled.h3`
  font-size: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: 1.5rem;
  overflow: hidden;
  margin: 0;
`;
export const SongArtist = styled.p`
  white-space: nowrap;
  overflow: hidden;
  width: 20vw;
  text-overflow: ellipsis;
  color: #aaaaaa;
  font-size: 0.8rem;
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
