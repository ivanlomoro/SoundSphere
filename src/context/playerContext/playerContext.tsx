import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { createContext } from "react";
import { Songs } from "../../Types/SongsTypes";

type PlayerContextType = {
  currentList: Songs[];
  setCurrentList: Dispatch<SetStateAction<Songs[] | never[]>>;
  currentSong: Songs | null;
  progress: ProgressType;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  handlePlayPause: () => void;
  duration: DurationType;
  handleProgress: (playedSeconds: HandleProgressPropsType) => void;
  handleDuration: (duration: number) => void;
  handleNext: () => void;
  handlePrevious: () => void;
};

type HandleProgressPropsType = {
  playedSeconds: number;
};

type DurationType = {
  duration: number;
  formattedDuration: string;
};

type ProgressType = {
  currentSeconds: number;
  currentPercentage: number;
  currentFormattedTime: string;
};

type PlayerContextProviderProps = {
  children: ReactNode;
};

const initialState: PlayerContextType = {
  currentSong: null,
  currentList: [],
  setCurrentList: () => {},
  progress: {
    currentSeconds: 0,
    currentPercentage: 0,
    currentFormattedTime: "",
  },
  playing: false,
  setPlaying: () => {},
  handlePlayPause: () => {},
  duration: { duration: 0, formattedDuration: "" },
  handleProgress: (playedSeconds: HandleProgressPropsType) => {},
  handleDuration: (duration: number) => {},
  handleNext: () => {},
  handlePrevious: () => {},
};

export const PlayerContext = createContext<PlayerContextType>(initialState);

export const PlayerContextProvider = ({
  children,
}: PlayerContextProviderProps) => {
  const [currentSong, setCurrentSong] = useState<Songs | null>(null);
  const [currentList, setCurrentList] = useState<Songs[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);

  const [progress, setProgress] = useState<ProgressType>({
    currentSeconds: 0,
    currentPercentage: 0,
    currentFormattedTime: "",
  });

  const [duration, setDuration] = useState({
    duration: 0,
    formattedDuration: "",
  });

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const songIndex = currentList.findIndex(
      (song) => song.id === currentSong?.id
    );

    setCurrentSongIndex(songIndex);
  }, [currentSong]);

  const handlePlayPause = () => {
    setPlaying(!playing);
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

  const handleProgress = ({ playedSeconds }: HandleProgressPropsType) => {
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

  const handleNext = () => {
    if (currentSongIndex && currentSongIndex < currentList.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      setCurrentSong(currentList[currentSongIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentSongIndex && currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      setCurrentSong(currentList[currentSongIndex - 1]);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        currentList,
        setCurrentList,
        progress,
        playing,
        setPlaying,
        handlePlayPause,
        duration,
        handleProgress,
        handleDuration,
        handleNext,
        handlePrevious,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
