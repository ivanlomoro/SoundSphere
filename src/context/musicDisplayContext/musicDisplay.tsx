import { createContext, useContext, useState } from 'react';
import { Songs } from '../../Types/SongsTypes';
import React, { ReactNode } from 'react';

const PlayerContext = createContext<{
  currentSong: Songs | null;
  setPlayingSong: (song: Songs | null) => void;

} | undefined>(undefined);

export const usePlayerContext = () => {
  return useContext(PlayerContext);
};

interface PlayerProviderProps {
  children: ReactNode;
  songs: Songs[];
  currentSong: Songs;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Songs | null>(null);

  const {toggleFavorite, isFavorite } = useInteractions();

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


  const setPlayingSong = (song: Songs | null) => {
    setCurrentSong(song);
  };

  return (
    <PlayerContext.Provider value={{ currentSong, setPlayingSong }}>
      {children}
    </PlayerContext.Provider>
  );
};