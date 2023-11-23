import { useRef, useState } from "react";
import { AiOutlineStepBackward, AiOutlineStepForward } from "react-icons/ai";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import ReactPlayer from 'react-player';
import styled from "styled-components";
import { Button } from "../button/Button";
import { ProgressBar } from "../progressBar/ProgressBar";
import { Songs } from "../../Types/SongsTypes";
import { useNavigate } from "react-router-dom";

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
  gap: 20px;
`;

const StyledCover = styled.img`
  border-radius: 15px;
`;

const PlayerContainer = styled.div`
  display: flex;
   border-radius: var(--radius-sm);
  font-size:clamp(0.8rem, 1.5rem, 2rem);
  background-color: var(--clr-bg-elements);
  padding-bottom: var(--space-xl);
  padding-top: var(--space-xl);
  margin: var(--space-md);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

`;

type PlayerDisplayProps = {
  songs: Songs[];
  currentSong: Songs;
};

export const PlayerDisplay = ({ songs, currentSong }: PlayerDisplayProps) => {
  const [playing, setPlaying] = useState(false);

  const initialSongIndex = songs.findIndex(
    (song) => song.id === currentSong.id
  );

  const [currentSongIndex, setCurrentSongIndex] = useState(initialSongIndex);

  const [progress, setProgress] = useState({
    currentSeconds: 0,
    currentPercentage: 0,
    currentFormattedTime: "",
  });
  const [duration, setDuration] = useState({
    duration: 0,
    formattedDuration: "",
  });

  const playerRef = useRef<ReactPlayer>(null);

  const navigate = useNavigate();

  type handleProgressPropsType = {
    playedSeconds: number;
  };

  const getFormattedTime = (currentSeconds: number) => {
    const date = new Date(0);
    date.setSeconds(currentSeconds);
    const formattedTime = date.toISOString().substring(14, 19);
    return formattedTime;
  };

  const getPercentage = (currentSeconds: number) => {
    return currentSeconds > 0 ? currentSeconds / duration.duration : 0;
  };

  const handleProgress = ({ playedSeconds }: handleProgressPropsType) => {
    setProgress({
      currentSeconds: playedSeconds,
      currentPercentage: getPercentage(playedSeconds),
      currentFormattedTime: getFormattedTime(playedSeconds),
    });
  };

  const handleDuration = (duration: number) => {
    setDuration({
      duration: duration,
      formattedDuration: getFormattedTime(duration),
    });
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleNext = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      navigate(`/displaypage/${songs[currentSongIndex + 1].name}`);
    }
  };

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
    max-width: 300px;
    min-height: 2.5em;
    margin-bottom: 0;
  `;
  const StyledArtistName = styled.p`
    font-size: var(--fs-lg);
    max-width: 100vw;
    min-height: 2.5em;
    
  `;
  const PageContainer = styled.div`
  border: 3px solid var(--clr-accent);
  
  `

  return (
   <PageContainer>
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
      </HiddenPlayer> <PlayerContainer>
   
        <StyledCover src={currentSong.thumbnail} alt="Song Cover" />
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
        </ButtonContainer>
      </PlayerContainer>
    </PageContainer>
 
  );
};
