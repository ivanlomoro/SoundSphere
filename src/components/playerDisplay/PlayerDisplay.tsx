import { useRef, useState } from "react";
import { AiOutlineStepBackward, AiOutlineStepForward } from "react-icons/ai";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { Button } from "../button/Button";
import { ProgressBar } from "../progressBar/ProgressBar";
import { Songs } from "../../Types/SongsTypes";
import { useNavigate } from "react-router-dom";
import { FaveButton } from "../card/card.styled.components";
import { FullHeart } from "../card/card.styled.components";
import { EmptyHeart } from "../card/card.styled.components";
import { useInteractions } from "../../context/userContext/InteractionContext";


export type CustomEventType = {
  target: HTMLProgressElement;
  nativeEvent: {
    offsetX: number;
  };
};

const HiddenPlayer = styled.div`
  z-index: -5;
  width: 0;
  height: 0;
  visibility: hidden;
`;

const StyledPlayer = styled(ReactPlayer)`
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 3px solid red;
 `;

const StyledCover = styled.img`
max-height: 60%;
max-width: 60%;

`;

const ResponsiveContainer = styled.div`
max-height: 75%;
max-width: 90%;
margin-top: 0;
  display: flex;
  border-radius: var(--radius-sm);
  font-size:clamp(0.8rem, 1.5rem, 2rem);
  background-color: var(--clr-bg-elements);
  padding: var(--space-sm);
  margin: var(--space-sm);
  flex-direction: column;
  align-items: center;
`;

type PlayerDisplayProps = {
  songs: Songs[];
  currentSong: Songs;
};

// De donde viene "songs" "currentSong"
// useSong(): contexto
// De donde viene "songs" "currentSong"
// useSong(): contexto
export const PlayerDisplay = ({ songs, currentSong }: PlayerDisplayProps) => {
 const {toggleFavorite, isFavorite } = useInteractions();
 const [playing, setPlaying] = useState(false);
// Iniciar cancion index ?? identificar con 'id'
const initialSongIndex = songs.findIndex(
  (song) => song.id === currentSong.id
  );

    // Status de la currentSongIndex ??? + update
  const [currentSongIndex, setCurrentSongIndex] = useState(initialSongIndex);

    // Status progress ?? + update
  const [progress, setProgress] = useState({
    currentSeconds: 0,
    currentPercentage: 0,
    currentFormattedTime: "",
  });

  // Status duration ?? + update
  const [duration, setDuration] = useState({
    duration: 0,
    formattedDuration: "",
  });

  const playerRef = useRef<ReactPlayer>(null);

  const navigate = useNavigate();

  type handleProgressPropsType = {
    playedSeconds: number;
  };

  // funcion para formatear el tiempo
  const getFormattedTime = (currentSeconds: number) => {
    const date = new Date(0);
    date.setSeconds(currentSeconds);
    const formattedTime = date.toISOString().substring(14, 19);
    return formattedTime;
  };

  // funcion para conseguir porcentage
  const getPercentage = (currentSeconds: number) => {
    return currentSeconds > 0 ? currentSeconds / duration.duration : 0;
  };

  // función para manjera el proceso
  const handleProgress = ({ playedSeconds }: handleProgressPropsType) => {
    setProgress({
      currentSeconds: playedSeconds,
      currentPercentage: getPercentage(playedSeconds),
      currentFormattedTime: getFormattedTime(playedSeconds),
    });
  };

  // funció para la duración
  const handleDuration = (duration: number) => {
    setDuration({
      duration: duration,
      formattedDuration: getFormattedTime(duration),
    });
  };

  // función para "play" "pause"
  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  // functión para next
  const handleNext = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      navigate(`/displaypage/${songs[currentSongIndex + 1].name}`);
    }
  };

  // functión para previous
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
          onDuration={handleDuration}
        />
      </HiddenPlayer> <ResponsiveContainer>

        <StyledCover src={currentSong.thumbnail} alt="Song Cover" />

        <FaveButton onClick={() => { toggleFavorite(currentSong) }}>
          {isFavorite(currentSong.id) ? <FullHeart /> : <EmptyHeart />}
        </FaveButton>

        <StyledSongName>{currentSong.name}</StyledSongName>
        <StyledArtistName>{currentSong.artist}</StyledArtistName>
        <ProgressBar
          progress={progress}
          duration={duration}
          onClick={handleProgressClick}
        />
        <ButtonContainer>
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
          <FaveButton/>
        </ButtonContainer>
      </ResponsiveContainer>
    </>

  );
};
