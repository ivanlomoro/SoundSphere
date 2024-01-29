import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { AiOutlineStepBackward, AiOutlineStepForward } from "react-icons/ai";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import styled from "styled-components";
import { Button } from "../button/Button";
import { ProgressBar } from "../progressBar/ProgressBar";
import { FaveButton, Plus } from "../card/card.styled.components";
import { FullHeart } from "../card/card.styled.components";
import { EmptyHeart } from "../card/card.styled.components";
import { Songs } from "../../Types/SongsTypes";
import { FaRandom } from "react-icons/fa";
import { HeaderSection } from "../header/Header";

import {
  DurationType,
  ProgressType,
} from "../../context/playerContext/playerContext";
import VolumeController from "../volumeController/VolumeController";

export type CustomEventType = {
  target: HTMLProgressElement;
  nativeEvent: {
    offsetX: number;
  };
};

type StyledShuffleButtonType = {
  isShuffled: boolean;
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
  display: flex;
  border-radius: var(--radius-sm);
  font-size: var(--fs-lg);
  padding: var(--space-sm);
  margin: var(--space-sm);
  flex-direction: column;
  align-items: center;
  margin-block: auto;
  transform: translateY(-25px);
`;

const StyledSongName = styled.p`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  max-width: 85%;
  min-height: 58px;
  margin-bottom: 0;
`;

const PlayerDisplayContainer = styled.div<{ bg: string }>`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  background-color: #000000e3;
  backdrop-filter: blur(5px);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: #000000e3;
    background-image: ${(props) => (props.bg ? `url(${props.bg})` : "none")};
    background-size: cover;
    background-blend-mode: overlay;
    background-position: center;
    filter: blur(5px);
  }
`;

const StyledShuffleButton = styled.button<StyledShuffleButtonType>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) =>
    props.isShuffled ? "var(--clr-accent)" : "var(--clr-text-secondary)"};
`;

const InlineContainer = styled.div`
  display: flex;
  gap: 1em;
`;

type PlayerDisplayProps = {
  currentSong: Songs;
  progress: ProgressType;
  playing: boolean;
  handlePlayPause: () => void;
  duration: DurationType;
  handleNext: () => void;
  handlePrevious: () => void;
  handleProgressChange: (position: number) => void;
  toggleFavorite: (song: Songs) => void;
  isFavorite: (id: string) => boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  setSongForPlaylist: Dispatch<SetStateAction<Songs | null>>;
  isShuffled: boolean;
  setIsShuffled: Dispatch<SetStateAction<boolean>>;
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
};

export const PlayerDisplay: FC<PlayerDisplayProps> = ({
  currentSong,
  progress,
  playing,
  handlePlayPause,
  duration,
  handleNext,
  handlePrevious,
  handleProgressChange,
  toggleFavorite,
  isFavorite,
  setIsExpanded,
  setSongForPlaylist,
  isShuffled,
  setIsShuffled,
  volume,
  setVolume,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <PlayerDisplayContainer bg={currentSong.thumbnail}>
      <HeaderSection arrowBackAction={() => setIsExpanded(false)} />
      <ResponsiveContainer>
        <StyledCover src={currentSong.thumbnail} alt="Song Cover" />
        <StyledSongName>{currentSong?.name} </StyledSongName>
        <InlineContainer>
          <StyledShuffleButton
            isShuffled={isShuffled}
            onClick={() => setIsShuffled((prevState) => !prevState)}
          >
            <FaRandom size={16} />
          </StyledShuffleButton>
          <VolumeController volume={volume} setVolume={setVolume} />
        </InlineContainer>
        <ProgressBar
          progress={progress}
          duration={duration}
          onChange={handleProgressChange}
        />
        <ButtonContainer>
          <FaveButton></FaveButton>
          <FaveButton onClick={() => setSongForPlaylist(currentSong)}>
            <Plus />
          </FaveButton>
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
    </PlayerDisplayContainer>
  );
};
