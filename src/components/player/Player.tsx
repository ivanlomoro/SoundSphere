import styled from "styled-components";
import { useApiCalls } from "../../context/songContext/ApiCalls";
import { useContext, useRef } from "react";
import { PlayerContext } from "../../context/playerContext/playerContext";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { useInteractions } from "../../context/userContext/InteractionContext";
import { MiniPlayer } from "../Miniplayer/MiniPlayer";
import { PlayerDisplay } from "../playerDisplay/PlayerDisplay";

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

const Player = () => {
  const { publicSongs } = useApiCalls();
  const {
    currentSong: songFromContext,
    currentList: songs,
    playing,
    progress,
    handlePlayPause,
    duration,
    handleProgress,
    handleNext,
    handlePrevious,
    handleDuration,
    setCurrentList,
    setIsExpanded,
    isExpanded,
  } = useContext(PlayerContext);

  const { toggleFavorite, isFavorite } = useInteractions();

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
      {!isExpanded ? (
        <MiniPlayer
          currentSong={currentSong}
          playing={playing}
          progress={progress}
          duration={duration}
          handleProgressClick={handleProgressClick}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          handlePlayPause={handlePlayPause}
          setIsExpanded={setIsExpanded}
        />
      ) : (
        <PlayerDisplay
          currentSong={currentSong}
          playing={playing}
          progress={progress}
          handlePlayPause={handlePlayPause}
          duration={duration}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          handleProgressClick={handleProgressClick}
          setIsExpanded={setIsExpanded}
        />
      )}
    </>
  );
};

export default Player;
