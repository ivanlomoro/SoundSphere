alright then, now please using this import { AiOutlineHeart } from "react-icons/ai";
import styled from "styled-components";


export const Card = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background-color: #282828;
  color: white;
  border-radius: 10px;
  width: 20vh;
  min-width: 20vh;
  margin: 10px;
`;

export const CardImage = styled.img`
  width: calc(100% - 20px); // Add padding here
  height: auto;
  border-radius: 8px;
  margin: 10px;
`;

export const GridCard = styled(Card)`
  // ... GridCard styling
`;

export const GridCardImage = styled(CardImage)`
  width: 50%; // Full width for Grid
  height: 50%; // Full height for Grid
  margin: 0; // No padding for Grid
`;

export const RowCard = styled(Card)`
  // ... RowCard styling
`;


export const CardDescription = styled.div`
  width: 100%;
  padding: 0.4rem;
`;






export const SongName = styled.h3`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

export const ListSongName = styled(SongName)`
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
`;

// Other styled components for FavoriteButton, etc. remain the same



export const StyledButtonPlay = styled.button`
    background: var(--clr-accent);
    color: var(--clr-text-secondary);
    border: none;
    border-radius: var(--radius-sm);
    padding: var(--space-md);
    font-size: var(--fs-md);
    margin-top: var(--space-xs);
    cursor: pointer;
`;

export const ListCard = styled(Card)`
    width: 45vw;
    height: 15vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--clr-bg-elements);
    color: var(--clr-text-primary);
    border-radius: var(--radius-sm);
    margin: var(--space-md);
`;

export const ListCardImage = styled.img`
    width: 15vw;
    border-radius: var(--radius-sm);
`;

export const ListCardDescription = styled(CardDescription)`
  white-space: normal;
    padding: var(--space-xs);
    position: relative;
    width: 75vw;
    height: 25vw;
`;


export const GridCardDescription = styled.div`
    padding: var(--space-xs);
    position: relative;
    width: 25vw;
    height: 15vw;
`;

// Define FavoriteButton with hover effects
export const FavoriteButton = styled.button`
    position: relative;
    height: 30px;
    width: 30px;
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;

    /* Hover effect */
    &:hover ${AiOutlineHeart} {
        color: var(--clr-accent);
    }
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


import styled from "styled-components";


export const RecentGrid = styled.ul`
width: 100vw;
    display: grid;
    grid-template-columns: repeat(2, 45vw);
    grid-template-rows: repeat(2, 1fr);
   margin: 0;
   padding: 0;
   list-style: none;
   gap: .2rem;
`




import React, { ReactNode } from 'react';
import styled from 'styled-components';

// Styled component for the horizontal-scrolling row
const ScrollableRow = styled.ul`
  display: flex;
  padding-inline-start: 0px;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;

  -ms-overflow-style: none;
`;

// Define a type for the component props
interface ScrollableRowProps {
  children: ReactNode;
}

// Main Component
export const ScrollableRowComponent: React.FC<ScrollableRowProps> = ({ children }) => {
  return <ScrollableRow>{children}</ScrollableRow>;
};




