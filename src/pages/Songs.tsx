// SongList.tsx
import { RecentGrid } from '../components';
import { useSongs } from '../context/songContext/songContext';
import { useMagic } from '../hooks/useMagic'; // Import useMagic hook

export const SongList = () => {
  const { songs, isFavorite, toggleFavorite, addToRecents, favorites, recents } = useSongs();


const { renderSongs: renderNormalSongs } = useMagic({ songs, toggleFavorite, isFavorite, addToRecents, layout: "card" });
const { renderSongs: renderFavoriteSongs } = useMagic({ songs: favorites, toggleFavorite, isFavorite, addToRecents, layout: "card" });
const { renderSongs: renderRecentSongs } = useMagic({ songs: recents, toggleFavorite, isFavorite, addToRecents, layout: "grid" });

  return (
    <div>
    <div>
      <h2>Song List</h2>
        {renderNormalSongs()}
    </div>   
    <div>
      <h2>Recently Played</h2>
      <RecentGrid>
        {renderRecentSongs()}
      </RecentGrid>
      </div>
      <div>
      <h2>Favorites</h2>  
        {renderFavoriteSongs()}
    </div>
    </div>
  );
};