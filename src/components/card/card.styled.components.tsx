import styled from 'styled-components'
import { type Artist } from '../../Types/SongsTypes'
import { AiFillHeart, AiOutlineHeart, AiOutlinePlayCircle, AiOutlineStepBackward, AiOutlineStepForward } from 'react-icons/ai'
import { useRef, useState } from "react"
import { AiOutlineStepBackward, AiOutlineStepForward } from "react-icons/ai"
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs"
import ReactPlayer from "react-player"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useInteractions } from "../../context/userContext/InteractionContext"
import { Button } from "../button/Button"
import { FaveButton } from "../card/card.styled.components"
import { FullHeart } from "../card/card.styled.components"
import { EmptyHeart } from "../card/card.styled.components"
import { PlayerDisplayProps, CustomEventType, HiddenPlayer, StyledPlayer, ResponsiveContainer, StyledCover, ButtonContainer } from "../playerDisplay/PlayerDisplay"
import { ProgressBar } from "../progressBar/ProgressBar"
import { useState, useRef } from 'react'
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs'
import ReactPlayer from 'react-player'
import { useNavigate } from 'react-router-dom'
import { Button } from '..'
import { useInteractions } from '../../context/userContext/InteractionContext'
import { ProgressBar } from '../progressBar/ProgressBar'
import { FaveButton, FullHeart, EmptyHeart } from './card.styled.components'

export interface ArtistCardProps {
  artist: Artist
  toggleFollowed: (artist: Artist) => void
  isFollowed: (id: string) => boolean
}

// Common Button Container
export const CommonButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--w-full);
`

// Card Styles
export const Card = styled.li`
  display: flex; 
   align-items: center;
  flex-direction: column;
  font-size:clamp(0.8rem, 1.5rem, 2rem);
  background-color: var(--clr-bg-elements);
  color: var(--clr-text-secondary);
  border-radius: var(--radius-sm);
  padding: var(--space-md);
  width: 10rem;
  min-width: 10rem;
  margin: var(--space-md);
`

export const CardImage = styled.img`
  width: var(--w-full);
  border-radius: var(--radius-sm);
`

export const CardDescription = styled.div`
  width: var(--w-full);
  padding: var(--space-xs);
`

// List Styles
export const ListCard = styled(Card)`
  width: 85%;
  max-height: 10vh;
  flex-direction: row;
  align-items: center;
  margin: var(--space-md)
  ;
`
export const PlayButton = styled(AiOutlinePlayCircle)`
  height: 50px;
  width: 50px;
  position: absolute;
  left: 0;
 opacity : 0.2;
 &:hover{
    opacity: 1;
   }

  
`



export const ListCardImage = styled(CardImage)`
  max-height: 12vh;
  max-width: 12vh;
  position: relative;
  
`

export const ListCardDescription = styled(CardDescription)`
  padding: var(--space-md);
  font-size: clamp(0.5rem, 10vw, 1rem);
  overflow: hidden;

 
`


export const GridCard = styled.li`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  background-color: var(--clr-bg-elements);
  color: var(--clr-text-secondary);
  border-radius: var(--radius-sm);
  min-width: 95%;
  font-size:clamp(1rem, 1.3rem, 1.5rem);
  margin: var(--space-xs);
  align-items: center;
`


export const GridImageContainer = styled.div`
position: relative;

`

export const GridCardImage = styled.img`
  grid-column: 1;
  grid-row: 1/span 2;
  height: 50px;
  width: 50px;
  border-radius: var(--radius-sm);
`

export const GridCardDescription = styled.div`
  grid-column: 2;
 grid-row: 1/span 2;
  display: flex;  
  overflow: hidden;
   text-overflow: ellipsis;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--space-xs);

  
`

// Common Song Info Styles
export const SongName = styled.h3`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
   color: var(--clr-text-primary);
`

export const SongArtist = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: clamp(0.5rem, 10vw, 1rem);
  color: var(--clr-text-secondary);
  margin: 0;
`

// Action Buttons
export const FavoriteButton = styled.button`
  background: transparent;
  border: none;
  color: var(--clr-text-secondary);
  font-size: var(--fs-lg);
  cursor: pointer;
  &:hover{
    color: var(--clr-accent);
   }
  ;
`
export const FullHeart = styled(AiFillHeart)`
color: var(--clr-accent);
width: 30px;
height: 30px;
`

export const EmptyHeart = styled(AiOutlineHeart)`
width: 30px;
height: 30px;
`

export const FaveButton = styled.button`
background: transparent;
border: none;
color: var(--clr-text-secondary);
&:hover{
    color: var(--clr-accent);
   }
`
export const PlayListButton = styled.button`
background: transparent;
border: none;
color: var(--clr-text-secondary);
&:hover{
    color: var(--clr-accent);
   }
`

export const FollowedButton = styled.button`
  background: transparent;
  border: none;
  color: var(--clr-text-secondary);
  font-size: 24px;
  cursor: pointer;
  margin-top: var(--space-sm);
   &:hover{
    color: var(--clr-accent);
   }
`

export const ArtistActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--clr-accent);
`export const PlayerDisplay = ({ songs, currentSong }: PlayerDisplayProps) => {
  const { toggleFavorite, isFavorite } = useInteractions();
  const [playing, setPlaying] = useState(false);

  const initialSongIndex = songs.findIndex(
    (song) => song.id === currentSong.id
  );

  const [currentSongIndex, setCurrentSongIndex] = useState(initialSongIndex);

  const [progress, setProgress] = useState({
    currentSeconds: 0,
    currentPercentage: 0,
    currentFormattedTime: "",
  });
  const [duration, setDuration] = useState({
    duration: 0,
    formattedDuration: "",
  });

  const playerRef = useRef<ReactPlayer>(null);

  const navigate = useNavigate();

  type handleProgressPropsType = {
    playedSeconds: number;
  };

  const getFormattedTime = (currentSeconds: number) => {
    const date = new Date(0);
    date.setSeconds(currentSeconds);
    const formattedTime = date.toISOString().substring(14, 19);
    return formattedTime;
  };

  const getPercentage = (currentSeconds: number) => {
    return currentSeconds > 0 ? currentSeconds / duration.duration : 0;
  };

  const handleProgress = ({ playedSeconds }: handleProgressPropsType) => {
    setProgress({
      currentSeconds: playedSeconds,
      currentPercentage: getPercentage(playedSeconds),
      currentFormattedTime: getFormattedTime(playedSeconds),
    });
  };

  const handleDuration = (duration: number) => {
    setDuration({
      duration: duration,
      formattedDuration: getFormattedTime(duration),
    });
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleNext = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      navigate(`/displaypage/${songs[currentSongIndex + 1].name}`);
    }
  };

  const handlePrevious = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      navigate(`/displaypage/${songs[currentSongIndex - 1].name}`);
    }
  };

  const handleProgressClick = (event: CustomEventType) => {
    const progressBar = event.target;
    const clickPosition = event.nativeEvent.offsetX;
    const progressBarWidth = progressBar.clientWidth;
    const fraction = clickPosition / progressBarWidth;
    playerRef.current && playerRef.current.seekTo(fraction, "fraction");
  };

  const StyledSongName = styled.p`
    font-size: var(--fs-xl);
    max-width: 85%;
    margin-bottom: 0;
  `;
  const StyledArtistName = styled.p`
    font-size: var(--fs-lg);
    max-width: 85%;
  
    
  `;

  return (
    <>
      <HiddenPlayer>

        <StyledPlayer
          url={songs[currentSongIndex].url}
          playing={playing}
          ref={playerRef}
          controls={false}
          width="100%"
          height="100%"
          onProgress={handleProgress}
          onDuration={handleDuration} />
      </HiddenPlayer> <ResponsiveContainer>

        <StyledCover src={currentSong.thumbnail} alt="Song Cover" />

        <FaveButton onClick={() => { toggleFavorite(currentSong); } }>
          {isFavorite(currentSong.id) ? <FullHeart /> : <EmptyHeart />}
        </FaveButton>

        <StyledSongName>{currentSong.name}</StyledSongName>
        <StyledArtistName>{currentSong.artist}</StyledArtistName>
        <ProgressBar
          progress={progress}
          duration={duration}
          onClick={handleProgressClick} />
        <ButtonContainer>
          <Button
            variant="StyledButtonDisplay"
            content={<AiOutlineStepBackward />}
            onClick={handlePrevious} />
          <Button
            variant="StyledButtonDisplayPlay"
            content={playing ? <BsFillPauseFill /> : <BsFillPlayFill />}
            onClick={handlePlayPause} />
          <Button
            variant="StyledButtonDisplay"
            content={<AiOutlineStepForward />}
            onClick={handleNext} />
          <FaveButton />
        </ButtonContainer>
      </ResponsiveContainer>
    </>

  );
};

