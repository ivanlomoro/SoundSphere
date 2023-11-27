// SongList.tsx
import { RecentGrid, ScrollableRowComponent } from '../components';
import { UploadForm } from '../components/uploadForm/UploadForm';
import { useSongs } from '../context/songContext/songContext';
import { useInteractions } from '../context/userContext/InteractionContext';
import { useMagic } from '../hooks/useMagic';


export const SongList = () => {
  const { songs,  artists  } = useSongs();
  const { favorites, recents, toggleFavorite, isFavorite, toggleFollowed, isFollowed, addToRecents } =useInteractions()

  const {renderArtists } = useMagic({
    songs,
    artists,
    toggleFavorite,
    toggleFollowed,
    isFavorite,
    isFollowed,
    addToRecents,
    layout : 'card',
  });
  
  const { renderSongs: renderNormalSongs } = useMagic({ songs, toggleFavorite, isFavorite, addToRecents, layout: "card" });
  const { renderSongs: renderFavoriteSongs } = useMagic({ songs: favorites, toggleFavorite, isFavorite, addToRecents, layout: "card" });
  const { renderSongs: renderRecentSongs } = useMagic({ songs: recents, toggleFavorite, isFavorite, addToRecents, layout: "grid" });

  return (
    <div>
      <div>
        <h2>Song List</h2>
        <ScrollableRowComponent>
          {renderNormalSongs()}
        </ScrollableRowComponent>

      </div>
      <UploadForm/>
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