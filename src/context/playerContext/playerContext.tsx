import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { createContext } from "react";
import { Songs } from "../../Types/SongsTypes";

type PlayerContextType = {
  currentList: Songs[] | never[];
  setCurrentList: Dispatch<SetStateAction<Songs[] | never[]>>;
  currentSong: Songs | null;
  setCurrentSong: Dispatch<SetStateAction<Songs | null>>;
};

type PlayerContextProviderProps = {
  children: ReactNode;
};

const initialState: PlayerContextType = {
  currentSong: null,
  setCurrentSong: () => {},
  currentList: [],
  setCurrentList: () => {},
};

export const PlayerContext = createContext<PlayerContextType>(initialState);

export const PlayerContextProvider = ({
  children,
}: PlayerContextProviderProps) => {
  const [currentSong, setCurrentSong] = useState<Songs | null>(null);
  const [currentList, setCurrentList] = useState([]);

  return (
    <PlayerContext.Provider
      value={{ currentSong, setCurrentSong, currentList, setCurrentList }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
