
import { useSongs } from "../context/songContext/songContext";
import { SongCard } from "../components/card/FinalCardForMerge";

export const FavoritesSongs: React.FC = () => {
  const { favorites, isFavorite, toggleFavorite, addToRecents } = useSongs();

  return (
    <div>
      <h1>Favorite Songs</h1>

    
      <div>
        {favorites.length === 0 && <h1>No favorites yet</h1>}
        {favorites.map((song) => (
          <SongCard
            key={song.id}
            variant='list'
            song={song}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            addToRecents={addToRecents}
          />
        ))}
      </div>
    </div>
  );
};

