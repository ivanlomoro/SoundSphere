import React from 'react';
import { usePlayerContext } from '../../context/musicDisplayContext/musicDisplay'; // Import the usePlayerContext hook
import { useParams } from 'react-router-dom';
import { useApiCalls } from '../../context/songContext/ApiCalls';
import { useSongs } from '../../context/songContext/songContext';
import { PlayerDisplay } from '../playerDisplay/PlayerDisplay';

const TinyPlayer = () => {
  const { currentSong } = usePlayerContext();
  const { toggleFavorite, isFavorite } = useSongs();
  const { publicSongs } = useApiCalls()
  const { name } = useParams();


  return (
    <div className="tiny-player">
      {currentSong && (
        <>
          <p>Now Playing:</p>
          <p>{currentSong.name}</p>

            <PlayerDisplay
            isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
         songs={publicSongs}
          currentSong = {currentSong}
        />
        </>
      )}
    </div>
  );
};

export default TinyPlayer;