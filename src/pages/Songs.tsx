import { SongCard } from "../components";
import { useSongs } from "../context/songContext/songContext";



export const SongList = () => {

  const { songs, recents, favorites, toggleFavorite, isFavorite, addToRecents } = useSongs();
import { useSongs } from "../context/songContext/songContext";
import useMagic from "../hooks/useMagic";


export const SongList = () => {

  const { songs, addToRecents, toggleFavorite, isFavorite } = useSongs();


  const { renderGridSongs, renderRowSongs } = useMagic(songs, toggleFavorite, isFavorite, addToRecents, 4); // Display 4 songs in grid

  return (
    <div>
      <h1>Recently Played</h1>
      {renderGridSongs()}

      <h1>Favorites</h1>
      {renderRowSongs()}

      <h1>All Songs</h1>
      {renderRowSongs()}
    </div>
  );
};


