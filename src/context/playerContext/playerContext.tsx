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
  setCurrentSong: Dispatch<SetStateAction<Songs | null>>;
  currentSongIndex: number | null;
  setCurrentSongIndex: Dispatch<SetStateAction<number | null>>;
  progress: ProgressType;
  setProgress: Dispatch<SetStateAction<ProgressType>>;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  handlePlayPause: () => void;
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
  setCurrentSong: () => {},
  currentList: [],
  setCurrentList: () => {},
  currentSongIndex: null,
  setCurrentSongIndex: () => {},
  progress: {
    currentSeconds: 0,
    currentPercentage: 0,
    currentFormattedTime: "",
  },
  setProgress: () => {},
  playing: false,
  setPlaying: () => {},
  handlePlayPause: () => {},
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

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        currentList,
        setCurrentList,
        currentSongIndex,
        setCurrentSongIndex,
        progress,
        setProgress,
        playing,
        setPlaying,
        handlePlayPause,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
