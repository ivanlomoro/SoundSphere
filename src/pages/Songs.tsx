import { SongCard } from "../components";
import { useSongs } from "../context/songContext/songContext";



export const SongList = () => {

  const { songs, recents, favorites, toggleFavorite, isFavorite, addToRecents } = useSongs();

  return (
    <div>
      <h1>Recently Played</h1>
      <div>
        {recents.slice(0, 4).map((song) => (
          <SongCard key={song.id} song={song} toggleFavorite={toggleFavorite} isFavorite={isFavorite} addToRecents={addToRecents} />
        ))}
      </div>

      <h1>Favorites</h1>
      <div>
        {favorites.map((song) => (
          <SongCard key={song.id} song={song} toggleFavorite={toggleFavorite} isFavorite={isFavorite} addToRecents={addToRecents} />
        ))}
      </div>

      <h1>All Songs</h1>
      <div>
        {songs.map((song) => (
          <SongCard key={song.id} song={song} toggleFavorite={toggleFavorite} isFavorite={isFavorite} addToRecents={addToRecents} />
        ))}
      </div>
    </div>
  );
};




