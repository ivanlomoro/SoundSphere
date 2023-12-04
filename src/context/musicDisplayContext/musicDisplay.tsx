// MusicPlayerContext.js (or MusicPlayerContext.ts for TypeScript)
import { createContext, useContext, useState } from 'react';

// Create a new context
const MusicPlayerContext = createContext();

// Create a custom hook to access the context
export function useMusicPlayer() {
  return useContext(MusicPlayerContext);
}

// Create a MusicPlayerProvider component
export function MusicPlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Add any other relevant state and functions for your music player

  const playSong = (song) => {
    // Implement logic to play the selected song
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const pauseSong = () => {
    // Implement logic to pause the currently playing song
    setIsPlaying(false);
  };

  // You can provide other functions and state values as needed

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        pauseSong,
        // Provide other values and functions here
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
}