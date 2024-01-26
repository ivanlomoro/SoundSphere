import { Dispatch, FC, SetStateAction } from "react";
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

import {
  DurationType,
  ProgressType,
} from "../../context/playerContext/playerContext";
import { HeaderSection } from "..";
import RangeSlider from "../rangeSlider/RangeSlider";

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

const PlayerDisplayContainer = styled.div`
  position: fixed;
  inset: 0;
  background-color: #000000e3;
  backdrop-filter: blur(5px);
`;

const StyledShuffleButton = styled.button<StyledShuffleButtonType>`
  background: none;
  border: none;
  color: ${(props) =>
    props.isShuffled ? "var(--clr-accent)" : "var(--clr-text-secondary)"};
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
  handleProgressClick,
  toggleFavorite,
  isFavorite,
  setIsExpanded,
  setSongForPlaylist,
  isShuffled,
  setIsShuffled,
  volume,
  setVolume,
}) => {
  return (
    <PlayerDisplayContainer>
      <HeaderSection arrowBackAction={() => setIsExpanded(false)} />
      <ResponsiveContainer>
        <StyledCover src={currentSong.thumbnail} alt="Song Cover" />
        <StyledSongName>{currentSong?.name} </StyledSongName>
        {currentSong.artist && (
          <StyledArtistName>{currentSong.artist}</StyledArtistName>
        )}
        <StyledShuffleButton
          isShuffled={isShuffled}
          onClick={() => setIsShuffled((prevState) => !prevState)}
        >
          <FaRandom size={16} />
        </StyledShuffleButton>
        <RangeSlider
          minValue={0}
          maxValue={1}
          value={volume}
          handleChange={setVolume}
        />
        <ProgressBar
          progress={progress}
          duration={duration}
          onClick={handleProgressClick}
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
