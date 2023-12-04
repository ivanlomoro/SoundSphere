import { useContext, useRef } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { Button } from "../button/Button";
import { ProgressBar } from "../progressBar/ProgressBar";
import { FullMiniHeart, MiniFaveButton } from "../card/card.styled.components";
import { EmptyHeart } from "../card/card.styled.components";
import { useInteractions } from "../../context/userContext/InteractionContext";
import { PlayerContext } from "../../context/playerContext/playerContext";
import { useApiCalls } from "../../context/songContext/ApiCalls";
import { useNavigate } from "react-router-dom";
import { DISPLAYPAGE } from "../../routes/paths";

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

export const MiniPlayer = () => {
  const navigate = useNavigate();
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
        <InlineContainer onClick={() => navigate(DISPLAYPAGE)}>
          <MiniCover src={currentSong.thumbnail} alt="Song Cover" />
          <div>
            <p>{currentSong?.name} </p>
            <p>{currentSong.artist}</p>
          </div>
        </InlineContainer>
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
