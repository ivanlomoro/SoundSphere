import { Dispatch, FC, SetStateAction } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import styled from "styled-components";
import { Button } from "../button/Button";
import { ProgressBar } from "../progressBar/ProgressBar";
import {
  FullMiniHeart,
  MiniFaveButton,
  Plus,
} from "../card/card.styled.components";
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
  position: fixed;
  z-index: 1;
  width: calc(100% - 16px);
  bottom: 70px;
  margin-left: 0;
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
  align-items: center;
  gap: 1em;
  flex-grow: 1;
  cursor: pointer;
`;

type MiniPlayerProps = {
  currentSong: Songs;
  progress: ProgressType;
  playing: boolean;
  handlePlayPause: () => void;
  duration: DurationType;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  handleProgressChange: (position: number) => void;
  toggleFavorite: (song: Songs) => void;
  isFavorite: (id: string) => boolean;
  setSongForPlaylist: Dispatch<SetStateAction<Songs | null>>;
};

export const MiniPlayer: FC<MiniPlayerProps> = ({
  currentSong,
  playing,
  progress,
  duration,
  handleProgressChange,
  toggleFavorite,
  isFavorite,
  handlePlayPause,
  setIsExpanded,
  setSongForPlaylist,
}) => {
  return (
    <>
      <MiniPlayerContainer>
        <InlineExpandibleContainer onClick={() => setIsExpanded(true)}>
          <MiniCover src={currentSong.thumbnail} alt="Song Cover" />
          <div>
            <p>{currentSong?.name} </p>
          </div>
        </InlineExpandibleContainer>
        <ProgressBar
          progress={progress}
          duration={duration}
          onChange={handleProgressChange}
          mini={true}
        />
        <InlineContainer>
          <MiniFaveButton onClick={() => setSongForPlaylist(currentSong)}>
            <Plus />
          </MiniFaveButton>
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
