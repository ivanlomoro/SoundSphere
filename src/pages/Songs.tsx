// SongList.tsx
import { useEffect, useState } from 'react';
import { RecentGrid, ScrollableRowComponent } from '../components';
import { useSongs } from '../context/songContext/songContext';
import { useInteractions } from '../context/userContext/InteractionContext';
import { useRenderer } from '../hooks/useRenderer';
import axios from 'axios';
import { Songs } from '../Types/SongsTypes';





export const SongList = () => {
  const { songs,  artists  } = useSongs();
  const { favorites, recents, toggleFavorite, isFavorite, toggleFollowed, isFollowed, addToRecents } =useInteractions()

  const {renderArtists } = useRenderer({
    songs,
    artists,
    toggleFavorite,
    toggleFollowed,
    isFavorite,
    isFollowed,
    addToRecents,
    layout : 'card',
  });
  
   
  const { renderSongs: renderFavoriteSongs } = useRenderer({ songs: favorites, toggleFavorite, isFavorite, addToRecents, layout: "card" });
  
  
  
  const [fetchedSongs, setFetchedSongs] = useState<Songs[]>([]);
  const { renderSongs: renderRecentSongs } = useRenderer({ songs: recents, toggleFavorite, isFavorite, addToRecents, layout: "card" });
  const { renderSongs: renderPublicSongs } = useRenderer({ songs: fetchedSongs, toggleFavorite, isFavorite, addToRecents, layout: "card" });
  useEffect(() => {
    
    const fetchSongs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/song/public'); 
        if (response.status === 200) {
          setFetchedSongs(response.data); 
        } else {
          console.error('Failed to fetch songs from the API');
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

   
    fetchSongs();
  }, []);


  return (
    <div>
      <div>
        <h2>Song List</h2>
        <ScrollableRowComponent>
          {renderPublicSongs()}
        </ScrollableRowComponent>

      </div>
      
      <div>
        <h2>Recently Played</h2>
        <ScrollableRowComponent>
          {renderRecentSongs()}
        </ScrollableRowComponent>
      </div>
      <div>
        <h2>Favorites</h2>
        <ScrollableRowComponent>
          {renderFavoriteSongs()}
        </ScrollableRowComponent>
      </div>
      <div>
        <h2>Artists</h2>
        <ScrollableRowComponent>
          {renderArtists()}
        </ScrollableRowComponent>
      </div>
    </div>
  );
};