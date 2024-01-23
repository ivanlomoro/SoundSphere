import { Dispatch, FC, SetStateAction } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import styled from "styled-components";
import { Button } from "../button/Button";
import { ProgressBar } from "../progressBar/ProgressBar";
import { FullMiniHeart, MiniFaveButton } from "../card/card.styled.components";
import { EmptyHeart } from "../card/card.styled.components";
import {
  DurationType,
  ProgressType,
} from "../../context/playerContext/playerContext";
import { Songs } from "../../Types/SongsTypes";

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

const MiniPlayerContainer = styled.div`
  position: sticky;
  bottom: 70px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  gap: 1em;
  align-items: center;
  height: 55px;
  color: #000;
  font-size: var(--fs-md);
  font-weight: var(--weight-semibold);
  background-color: #fff;
  margin-bottom: 10px;
  padding: 0.75em 1.5em 0.75em 0.75em;
  border-radius: 8px;
`;

const MiniCover = styled.img`
  height: 42px;
  width: 42px;
  border-radius: 5px;
`;

const InlineContainer = styled.div`
  display: flex;
  gap: 1em;
`;

const InlineExpandibleContainer = styled.div`
  display: flex;
  gap: 1em;
  flex-grow: 1;
`;

type MiniPlayerProps = {
  currentSong: Songs;
  progress: ProgressType;
  playing: boolean;
  handlePlayPause: () => void;
  duration: DurationType;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  handleProgressClick: (event: CustomEventType) => void;
  toggleFavorite: (song: Songs) => void;
  isFavorite: (id: string) => boolean;
};

export const MiniPlayer: FC<MiniPlayerProps> = ({
  currentSong,
  playing,
  progress,
  duration,
  handleProgressClick,
  toggleFavorite,
  isFavorite,
  handlePlayPause,
  setIsExpanded,
}) => {
  return (
    <>
      <MiniPlayerContainer>
        <InlineExpandibleContainer onClick={() => setIsExpanded(true)}>
          <MiniCover src={currentSong.thumbnail} alt="Song Cover" />
          <div>
            <p>{currentSong?.name} </p>
            <p>{currentSong.artist}</p>
          </div>
        </InlineExpandibleContainer>
        <ProgressBar
          progress={progress}
          duration={duration}
          onClick={handleProgressClick}
          mini={true}
        />
        <InlineContainer>
          <MiniFaveButton
            onClick={() => {
              toggleFavorite(currentSong);
            }}
          >
            {isFavorite(currentSong.id) ? <FullMiniHeart /> : <EmptyHeart />}
          </MiniFaveButton>
          <Button
            variant="StyledButtonMiniPlay"
            content={playing ? <BsFillPauseFill /> : <BsFillPlayFill />}
            onClick={handlePlayPause}
          />
        </InlineContainer>
      </MiniPlayerContainer>
    </>
  );
};
