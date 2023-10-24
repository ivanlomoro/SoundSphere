import { useEffect, useRef, useState } from 'react';
import { AiOutlineStepBackward, AiOutlineStepForward } from 'react-icons/ai';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs'
import ReactPlayer from 'react-player'
import styled from 'styled-components';
import { Button } from '../button/Button';
import { ProgressBar } from '../progressBar/ProgressBar';
import db from "../../data/db.json";
import { Songs } from '../../pages/Songs';

const [songs, setSongs] = useState<Songs[]>([])
    useEffect(() => {
        setSongs(db.songData);
    }, [])

const HiddenPlayer = styled.div`
  z-index: -5;
  width: 0;
  height: 0;
  visibility: hidden;
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

const StyledCover = styled.img`
    border-radius: 15px; 
`

const CenteredDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: var(--space-xl);
`


type PlayerDisplayProps = {
    media: string[];
}

export const PlayerDisplay = ({ media }: PlayerDisplayProps) => {
    const [playing, setPlaying] = useState(false)
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [progress, setProgress] = useState({
        currentSeconds: 0,
        currentPercentage: 0,
        currentFormattedTime: ""
    })
    const [duration, setDuration] = useState({
        duration: 0,
        formattedDuration: ""
    })

    const playerRef = useRef(null)

    type handleProgressPropsType = {
        playedSeconds: number
    }

    const getFormattedTime = (currentSeconds:number) => {
        const date = new Date(0)
        date.setSeconds(currentSeconds)
        const formattedTime = date.toISOString().substring(14,19)
        return formattedTime
    }

    const getPercentage = (currentSeconds:number) => {
        return currentSeconds > 0 ? currentSeconds / duration.duration : 0
    }

    const handleProgress = ({playedSeconds}:handleProgressPropsType) => {
        setProgress({
            currentSeconds: playedSeconds,
            currentPercentage: getPercentage(playedSeconds),
            currentFormattedTime: getFormattedTime(playedSeconds),
        })
    }

    const handleDuration = (duration:number) => {
        setDuration({
            duration: duration,
            formattedDuration: getFormattedTime(duration)
        })
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
            <HiddenPlayer>
                <StyledPlayer
                    url={media[currentSongIndex]}
                    playing={playing}
                    ref={playerRef}
                    controls={false}
                    width="100%"
                    height="100%"
                    onProgress={handleProgress}
                    onDuration={handleDuration}
                />
            </HiddenPlayer>
            <CenteredDiv >
            <StyledCover src="https://placehold.co/350" alt="Song Cover" />
            <h1>Nombre Cancion</h1>
            <p>Nombre del artista</p>
            <ProgressBar progress={progress} duration={duration}/>
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
            </CenteredDiv>
        </>
    )
}