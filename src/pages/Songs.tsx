// SongList.tsx
import { RecentGrid, ScrollableRowComponent } from '../components';
import { useSongs } from '../context/songContext/songContext';
import { useInteractions } from '../context/userContext/InteractionContext';
import { useRenderer } from '../hooks/useRenderer';


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
  
  const { renderSongs: renderNormalSongs } = useRenderer({ songs, toggleFavorite, isFavorite, addToRecents, layout: "card" });
  const { renderSongs: renderFavoriteSongs } = useRenderer({ songs: favorites, toggleFavorite, isFavorite, addToRecents, layout: "card" });
  const { renderSongs: renderRecentSongs } = useRenderer({ songs: recents, toggleFavorite, isFavorite, addToRecents, layout: "grid" });

  return (
    <div>
      <div>
        <h2>Song List</h2>
        <ScrollableRowComponent>
          {renderNormalSongs()}
        </ScrollableRowComponent>

      </div>
      
      <div>
        <h2>Recently Played</h2>
        <RecentGrid>
          {renderRecentSongs()}
        </RecentGrid>
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