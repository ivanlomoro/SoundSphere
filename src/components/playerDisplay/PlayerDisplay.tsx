import { useEffect, useRef, useState } from 'react';
import { AiOutlineStepBackward, AiOutlineStepForward } from 'react-icons/ai';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs'
import ReactPlayer from 'react-player'
import styled from 'styled-components';
import { Button } from '../button/Button';

const StyledPlayerContainer = styled.div`
  position: relative;
  padding-top: 60%; 
  max-width: 100%;
  background-color: white;
`;

const StyledPlayer = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px; 
`;

type PlayerDisplayProps = {
    media: string[];
}

export const PlayerDisplay = ({ media }: PlayerDisplayProps) => {
    const [playing, setPlaying] = useState(false)
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [progress, setProgress] = useState({
        currentSeconds: 0,
        currentPercentage: 0
    })
    const [duration, setDuration] = useState(0)

    const playerRef = useRef(null)

    type handleProgressPropsType = {
        playedSeconds: number
    }

    const getPercentage = (currentSeconds:number) => {
        return currentSeconds > 0 ? currentSeconds / duration : 0
    }

    const handleProgress = ({playedSeconds}:handleProgressPropsType) => {
        setProgress({
            currentSeconds: playedSeconds,
            currentPercentage: getPercentage(playedSeconds)
        })
    }

    const handleDuration = (duration:number) => {
        setDuration(duration)
    }

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    const handleNext = () => {
        if (currentSongIndex < media.length - 1) {
            setCurrentSongIndex(currentSongIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentSongIndex > 0) {
            setCurrentSongIndex(currentSongIndex - 1);
        }
    };

    return (
        <>
            <StyledPlayerContainer>
                <StyledPlayer
                    url={media[currentSongIndex]}
                    playing={playing}
                    ref={playerRef}
                    controls={true}
                    width="100%"
                    height="100%"
                    onProgress={handleProgress}
                    onDuration={handleDuration}
                />
            </StyledPlayerContainer>
            <ButtonContainer>
                <Button
                    variant='StyledButtonDisplay'
                    content={<AiOutlineStepBackward />}
                    onClick={handlePrevious}
                />
                <Button
                    variant='StyledButtonDisplayPlay'
                    content={playing ? <BsFillPauseFill /> : <BsFillPlayFill />}
                    onClick={handlePlayPause}
                />
                <Button
                    variant='StyledButtonDisplay'
                    content={<AiOutlineStepForward />}
                    onClick={handleNext}
                />
            </ButtonContainer>
            <p>{progress.currentSeconds/60}</p>
            <p>{duration}</p>
            <progress value={progress.currentPercentage}/>
        </>
    )
}