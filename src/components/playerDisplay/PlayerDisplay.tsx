import { useRef, useState } from 'react';
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai';
import ReactPlayer from 'react-player'
import styled from 'styled-components';

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

const CustomPlayButton = styled.button`
  background-color: var(--clr-accent);
  color: var(--clr-text-secondary);
  font-size: 24px;
  border: none;
  margin: 10px;
  padding: 5px 10px;
  cursor: pointer;
`;

const CustomForwardButton = styled.button`
  background-color: var(--clr-bg-primary);
  color: var(--clr-text-secondary);
  font-size: 24px;
  border: none;
  margin: 10px;
  padding: 5px 10px;
  cursor: pointer;
`;

const CustomBackwardButton = styled.button`
  background-color: var(--clr-bg-primary);
  color: var(--clr-text-secondary);
  font-size: 24px;
  border: none;
  margin: 10px;
  padding: 5px 10px;
  cursor: pointer;
`;

type PlayerDisplayProps = {
    media: string[];
}

export const PlayerDisplay = ({ media }: PlayerDisplayProps) => {
    const [playing, setPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const playerRef = useRef(null);

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
        <div>
            <StyledPlayerContainer>
                <StyledPlayer
                    url={media[currentSongIndex]}
                    playing={playing}
                    ref={playerRef}
                    controls={false}
                    width="100%"
                    height="100%"
                />
            </StyledPlayerContainer>

            <CustomBackwardButton onClick={handlePrevious}>Back</CustomBackwardButton>
            <CustomPlayButton onClick={handlePlayPause}>
                {playing ? <AiOutlinePauseCircle /> : <AiOutlinePlayCircle />}
            </CustomPlayButton>
            <CustomForwardButton onClick={handleNext}>Next</CustomForwardButton>
        </div>
    )
}