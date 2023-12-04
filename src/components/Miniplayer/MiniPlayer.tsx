import { useContext, useRef } from "react";
import { AiOutlineStepBackward, AiOutlineStepForward } from "react-icons/ai";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { Button } from "../button/Button";
import { ProgressBar } from "../progressBar/ProgressBar";
import { FaveButton } from "../card/card.styled.components";
import { FullHeart } from "../card/card.styled.components";
import { EmptyHeart } from "../card/card.styled.components";
import { useInteractions } from "../../context/userContext/InteractionContext";
import { PlayerContext } from "../../context/playerContext/playerContext";
import { useApiCalls } from "../../context/songContext/ApiCalls";

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
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  background-color: #111111;
  margin-bottom: 10px;
  padding: 0.75em 0.5em;
`;

const MiniCover = styled.img`
  height: 42px;
  width: 42px;
  border-radius: 5px;
`;

export const MiniPlayer = () => {
  const { toggleFavorite, isFavorite } = useInteractions();
  const { publicSongs } = useApiCalls();

  const {
    currentSong: songFromContext,
    currentList: songs,
    playing,
    progress,
    handlePlayPause,
    duration,
    handleProgress,
    handleDuration,
    handleNext,
    handlePrevious,
    setCurrentList,
  } = useContext(PlayerContext);

  if (songs.length === 0) setCurrentList(publicSongs);

  const currentSong = songFromContext ? songFromContext : songs[0];

  const playerRef = useRef<ReactPlayer>(null);

  const handleProgressClick = (event: CustomEventType) => {
    const progressBar = event.target;
    const clickPosition = event.nativeEvent.offsetX;
    const progressBarWidth = progressBar.clientWidth;
    const fraction = clickPosition / progressBarWidth;
    playerRef.current && playerRef.current.seekTo(fraction, "fraction");
  };

  return (
    <>
      <HiddenPlayer>
        <ReactPlayer
          url={currentSong.url}
          playing={playing}
          ref={playerRef}
          controls={false}
          width="100%"
          height="100%"
          onProgress={handleProgress}
          onDuration={handleDuration}
        />
      </HiddenPlayer>
      <MiniPlayerContainer>
        <MiniCover src={currentSong.thumbnail} alt="Song Cover" />

        {/* <FaveButton
          onClick={() => {
            toggleFavorite(currentSong);
          }}
        >
          {isFavorite(currentSong.id) ? <FullHeart /> : <EmptyHeart />}
        </FaveButton> */}

        <p>{currentSong?.name} </p>
        <p>{currentSong.artist}</p>
        <ProgressBar
          progress={progress}
          duration={duration}
          onClick={handleProgressClick}
          mini={true}
        />
        <Button
          variant="StyledButtonMiniPlay"
          content={playing ? <BsFillPauseFill /> : <BsFillPlayFill />}
          onClick={handlePlayPause}
        />
        <FaveButton />
      </MiniPlayerContainer>
    </>
  );
};
