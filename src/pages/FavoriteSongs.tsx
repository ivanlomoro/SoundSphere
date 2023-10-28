import { useSongs } from "../context/songContext/songContext";
import { HeaderSection } from "../components";
import { useMagic } from '../hooks/useMagic';



export const FavoriteSongs = () => {
  const { favorites, addToRecents, toggleFavorite, isFavorite } = useSongs();
  const { renderSongs: renderFavoriteSongs } = useMagic({ songs: favorites, toggleFavorite, isFavorite, addToRecents, layout: "list" });




  return (
    <>
      <HeaderSection text="Favorites" />

      <ul>
        <h2>Favorites</h2>
        {renderFavoriteSongs()}
      </ul>
    </>
  );
};