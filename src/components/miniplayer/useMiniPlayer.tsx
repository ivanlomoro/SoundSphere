import React from 'react';
import { usePlayerContext } from '../../context/musicDisplayContext/musicDisplay'; // Import the usePlayerContext hook

const TinyPlayer = () => {
  const { currentSong } = usePlayerContext();

  return (
    <div className="tiny-player">
      {currentSong && (
        <>
          <p>Now Playing:</p>
          <p>{currentSong.name}</p>
        </>
      )}
    </div>
  );
};

export default TinyPlayer;