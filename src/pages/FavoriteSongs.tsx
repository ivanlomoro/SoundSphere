import { useState } from "react";
import { ListSongCard } from "../components/card/ListSongCard";
import { useSongs} from "../context/songContext/songContext";
import { Songs } from "../Types/SongsTypes";
import { HeaderSection } from "../components";

export const FavoriteSongs = () => {
  const { favorites, isFavorite, toggleFavorite } = useSongs();

  const [recents, setRecents] = useState<Songs[]>([]);

  const addToRecents = (song: Songs) => {
    const { id } = song;
    const newRecents = [...recents];
    if (!recents.some((item: Songs) => item.id === id)) {
      newRecents.unshift(song);
      setRecents(newRecents);
    }
  };

  return (
    <>
      <HeaderSection text="Favorites" />
      <div>
        <ul>
          {favorites.length === 0 && <h1>No favorites yet</h1>}
          {favorites.map((song) => (
            <ListSongCard
              key={song.id}
              song={song}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
              addToRecents={addToRecents}
            />
          ))}
        </ul>
      </div>
    </>
  );
};