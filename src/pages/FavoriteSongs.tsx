
import { HeaderSection } from "../components";
import { useRenderer } from '../hooks/useRenderer';
import { useInteractions } from "../context/userContext/InteractionContext";



export const FavoriteSongs = () => {
  const { favorites, addToRecents, toggleFavorite, isFavorite } = useInteractions();
  const { renderSongs: renderFavoriteSongs } = useRenderer({ songs: favorites, toggleFavorite, isFavorite, addToRecents, layout: "list" });




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