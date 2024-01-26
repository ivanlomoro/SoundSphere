import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { createContext } from "react";
import { Songs } from "../../Types/SongsTypes";
import { useApiCalls } from "../songContext/ApiCalls";
import { createShuffledIndexesObject } from "../../utils/shuffleIndexes";

type shuffledIndexesType = { [key: number]: number };

type PlayerContextType = {
  currentList: Songs[];
  setCurrentList: Dispatch<SetStateAction<Songs[] | never[]>>;
  currentSong: Songs | null;
  setCurrentSong: Dispatch<SetStateAction<Songs | null>>;
  progress: ProgressType;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  handlePlayPause: () => void;
  duration: DurationType;
  handleProgress: (playedSeconds: HandleProgressPropsType) => void;
  handleDuration: (duration: number) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  isShuffled: boolean;
  setIsShuffled: Dispatch<SetStateAction<boolean>>;
  shuffledIndexes: shuffledIndexesType;
  setShuffledIndexes: Dispatch<SetStateAction<shuffledIndexesType>>;
};

export type HandleProgressPropsType = {
  playedSeconds: number;
};

export type DurationType = {
  duration: number;
  formattedDuration: string;
};

export type ProgressType = {
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
  setCurrentSong: () => {},
  progress: {
    currentSeconds: 0,
    currentPercentage: 0,
    currentFormattedTime: "",
  },
  playing: false,
  setPlaying: () => {},
  handlePlayPause: () => {},
  duration: { duration: 0, formattedDuration: "" },
  handleProgress: (playedSeconds: HandleProgressPropsType) => {
    if (playedSeconds) return null;
  },
  handleDuration: (duration: number) => {
    if (duration) return null;
  },
  handleNext: () => {},
  handlePrevious: () => {},
  isExpanded: false,
  setIsExpanded: () => {},
  isShuffled: false,
  setIsShuffled: () => {},
  shuffledIndexes: {},
  setShuffledIndexes: () => {},
};

export const PlayerContext = createContext<PlayerContextType>(initialState);

export const PlayerContextProvider = ({
  children,
}: PlayerContextProviderProps) => {
  const { publicSongs } = useApiCalls();
  const [currentSong, setCurrentSong] = useState<Songs | null>(null);
  const [currentList, setCurrentList] = useState<Songs[]>(publicSongs);
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledIndexes, setShuffledIndexes] = useState<shuffledIndexesType>(
    {}
  );
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
    if (songIndex === -1) setCurrentSongIndex(0);
    if (songIndex !== -1) setCurrentSongIndex(songIndex);
  }, [currentSong]);

  useEffect(() => {
    if (progress.currentPercentage === 1) {
      handleNext();
    }
  }, [progress]);

  useEffect(() => {
    const shuffledIndexes = createShuffledIndexesObject(currentList);
    setShuffledIndexes(shuffledIndexes);
  }, [currentList, isShuffled]);

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
    if (
      (currentSongIndex && currentSongIndex < currentList.length - 1) ||
      currentSongIndex === 0
    ) {
      if (!isShuffled) {
        setCurrentSongIndex(currentSongIndex + 1);
        setCurrentSong(currentList[currentSongIndex + 1]);
      }
      if (isShuffled) {
        setCurrentSongIndex(shuffledIndexes[currentSongIndex + 1]);
        setCurrentSong(currentList[shuffledIndexes[currentSongIndex + 1]]);
      }
    }
    if (currentSongIndex === currentList.length - 1) {
      setCurrentSongIndex(0);
      setCurrentSong(currentList[0]);
    }
  };

  const handlePrevious = () => {
    if (currentSongIndex && currentSongIndex > 0) {
      if (!isShuffled) {
        setCurrentSongIndex(currentSongIndex - 1);
        setCurrentSong(currentList[currentSongIndex - 1]);
      }
      if (isShuffled) {
        setCurrentSongIndex(shuffledIndexes[currentSongIndex - 1]);
        setCurrentSong(currentList[shuffledIndexes[currentSongIndex - 1]]);
      }
    }
    if (currentSongIndex === 0) {
      setCurrentSongIndex(currentList.length - 1);
      setCurrentSong(currentList[currentList.length - 1]);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        currentList,
        setCurrentList,
        setCurrentSong,
        progress,
        playing,
        setPlaying,
        handlePlayPause,
        duration,
        handleProgress,
        handleDuration,
        handleNext,
        handlePrevious,
        isExpanded,
        setIsExpanded,
        isShuffled,
        setIsShuffled,
        shuffledIndexes,
        setShuffledIndexes,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
