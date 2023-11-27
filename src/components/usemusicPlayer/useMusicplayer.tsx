import React from 'react';
import { useMusicPlayer } from '../../context/displayMusicContext/displayMusicContext';


function MusicPlayer() {
  const { currentSong, isPlaying, playSong, pauseSong } = useMusicPlayer();

  // Define a sample song for testing
  const someSong = { name: 'Sample Song' };

  return (
    <div>
      {currentSong && (
        <div>
          <p>Now Playing: {currentSong.name}</p>
          <p>Is Playing: {isPlaying ? 'Yes' : 'No'}</p>
        </div>
      )}
      {/* Use a sample song to play */}
      <button onClick={() => playSong(someSong)}>Play</button>
      <button onClick={pauseSong}>Pause</button>
    </div>
  );
}

export default MusicPlayer;