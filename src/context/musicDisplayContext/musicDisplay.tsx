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
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Songs | null>(null);

  const setPlayingSong = (song: Songs | null) => {
    setCurrentSong(song);
  };

  return (
    <PlayerContext.Provider value={{ currentSong, setPlayingSong }}>
      {children}
    </PlayerContext.Provider>
  );
};