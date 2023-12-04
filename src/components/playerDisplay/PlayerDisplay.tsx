import { useContext, useRef } from "react";
import { AiOutlineStepBackward, AiOutlineStepForward } from "react-icons/ai";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { Button } from "../button/Button";
import { ProgressBar } from "../progressBar/ProgressBar";
import { FaveButton, Minus, Plus } from "../card/card.styled.components";
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

const StyledPlayer = styled(ReactPlayer)``;

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

export const PlayerDisplay = () => {
  const { toggleFavorite, isFavorite, toggleSelected, isSelected } =
    useInteractions();
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
      <HiddenPlayer>
        <StyledPlayer
          url={currentSong.url}
          playing={playing}
          ref={playerRef}
          controls={false}
          width="100%"
          height="100%"
          onProgress={handleProgress}
          onDuration={handleDuration}
        />
      </HiddenPlayer>{" "}
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
              toggleSelected(currentSong);
            }}
          >
            {isSelected(currentSong.id) ? <Minus /> : <Plus />}
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
    </>
  );
};
