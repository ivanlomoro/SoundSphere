import { Dispatch, FC, SetStateAction, useRef } from "react";
import { AiOutlineStepBackward, AiOutlineStepForward } from "react-icons/ai";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { Button } from "../button/Button";
import { ProgressBar } from "../progressBar/ProgressBar";
import { FaveButton } from "../card/card.styled.components";
import { FullHeart } from "../card/card.styled.components";
import { EmptyHeart } from "../card/card.styled.components";
import { Songs } from "../../Types/SongsTypes";
import {
  DurationType,
  ProgressType,
} from "../../context/playerContext/playerContext";
import { ArrowBackSection } from "..";

export type CustomEventType = {
  target: HTMLProgressElement;
  nativeEvent: {
    offsetX: number;
  };
};

export const HiddenPlayer = styled.div`
  z-index: -5;
  width: 0;
  height: 0;
  visibility: hidden;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCover = styled.img`
  height: 250px;
  width: 250px;
  object-fit: cover;
`;

const ResponsiveContainer = styled.div`
  max-height: 75%;
  margin-top: 0;
  display: flex;
  border-radius: var(--radius-sm);
  font-size: var(--fs-lg);
  padding: var(--space-sm);
  margin: var(--space-sm);
  flex-direction: column;
  align-items: center;
`;

type PlayerDisplayProps = {
  currentSong: Songs;
  progress: ProgressType;
  playing: boolean;
  handlePlayPause: () => void;
  duration: DurationType;
  handleNext: () => void;
  handlePrevious: () => void;
  handleProgressClick: (event: CustomEventType) => void;
  toggleFavorite: (song: Songs) => void;
  isFavorite: (id: string) => boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
};

export const PlayerDisplay: FC<PlayerDisplayProps> = ({
  currentSong,
  progress,
  playing,
  handlePlayPause,
  duration,
  handleNext,
  handlePrevious,
  handleProgressClick,
  toggleFavorite,
  isFavorite,
  setIsExpanded,
}) => {
  const StyledSongName = styled.p`
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    max-width: 85%;
    min-height: 58px;
    margin-bottom: 0;
  `;

  const StyledArtistName = styled.p`
    font-size: var(--fs-lg);
    max-width: 85%;
  `;

  return (
    <>
      <ArrowBackSection onClick={() => setIsExpanded(false)} />
      <ResponsiveContainer>
        <StyledCover src={currentSong.thumbnail} alt="Song Cover" />
        <StyledSongName>{currentSong?.name} </StyledSongName>
        {currentSong.artist && (
          <StyledArtistName>{currentSong.artist}</StyledArtistName>
        )}
        <ProgressBar
          progress={progress}
          duration={duration}
          onClick={handleProgressClick}
        />
        <ButtonContainer>
          <FaveButton
            onClick={() => {
              console.log("Holi");
            }}
          ></FaveButton>
          <Button
            variant="StyledButtonDisplay"
            content={<AiOutlineStepBackward />}
            onClick={handlePrevious}
          />
          <Button
            variant="StyledButtonDisplayPlay"
            content={playing ? <BsFillPauseFill /> : <BsFillPlayFill />}
            onClick={handlePlayPause}
          />
          <Button
            variant="StyledButtonDisplay"
            content={<AiOutlineStepForward />}
            onClick={handleNext}
          />
          <FaveButton
            onClick={() => {
              toggleFavorite(currentSong);
            }}
          >
            {isFavorite(currentSong.id) ? <FullHeart /> : <EmptyHeart />}
          </FaveButton>
        </ButtonContainer>
      </ResponsiveContainer>
    </>
  );
};
