import styled from "styled-components";
import { Artists } from '../../Types/SongsTypes';


export const Card = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    background-color: #282828;
    color: white;
    border-radius: 10px;
    width: 40vw;
    min-width: 40vw;
    margin: 10px;
`;

export const CardImage = styled.img`
    width: 100%;
    height: 
    border-radius: 8px;
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
`
export const SongArtist = styled.p`
white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  Color: #aaaaaa;
  font-size: 12px;
  margin: 0;
`
export const FollowedButton = styled.button`
    background: transparent;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    margin-top: 5px;
`;

export const StyledButtonPlay = styled.button`
    background: #1DB954;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 16px;
    margin-top: 5px;
    cursor: pointer;
`;

export type ArtistCardProps = {
    artist: Artists;
    toggleFollowed: (artist: Artists) => void;
    isFollowed: (id: number) => boolean;
   
    
 }
