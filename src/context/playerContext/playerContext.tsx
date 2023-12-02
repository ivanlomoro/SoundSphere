import { ReactNode, useState } from "react";
import { createContext } from "vm";

// type PlayerContextType = {
//   currentList: [];
//   setCurrentList: () => void;
//   currentSong: [];
//   setCurrentSong: () => void;
// };

type PlayerContextProviderProps = {
  children: ReactNode;
};

const initialState = {
  currentSong: {},
  setCurrnetSong: () => {},
  currentList: [],
  setCurrentList: () => {},
};

export const PlayerContext = createContext(initialState);

export const PlayerContextProvider = ({
  children,
}: PlayerContextProviderProps) => {
  const [currentSong, setCurrentSong] = useState([]);
  const [currentList, setCurrentList] = useState({});

  return (
    <PlayerContext.Provider
      value={{ currentSong, setCurrentSong, currentList, setCurrentList }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
