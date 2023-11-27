
import React, { createContext, useContext, useState, ReactNode } from 'react';


const MusicPlayerContext = createContext<{
  currentSong: SongType | null;
  isPlaying: boolean;
  playSong: (song: SongType) => void;
  pauseSong: () => void;
} | null>(null);


interface MusicPlayerProviderProps {
  children: ReactNode;
}


interface SongType {

  name: string;

}


export function MusicPlayerProvider({ children }: MusicPlayerProviderProps) {
  const [currentSong, setCurrentSong] = useState<SongType | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);



  const playSong = (song: SongType) => {
// rellenar para decir si la musica esta en play
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const pauseSong = () => {
// rellenar para decir si la musica no esta en play
    setIsPlaying(false);
  };



  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        pauseSong,

      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
    const context = useContext(MusicPlayerContext);
  
    if (context === null) {
      throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
    }
  
    return context;
  }