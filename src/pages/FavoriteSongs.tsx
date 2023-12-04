import { HeaderSection } from "../components";
import { useRenderer } from '../hooks/useRenderer';
import { useInteractions } from "../context/userContext/InteractionContext";



export const FavoriteSongs = () => {
  const { favoriteSongs } = useInteractions();
  const { renderSongs: renderFavoriteSongs  } = useRenderer({ songs: favoriteSongs, layout: "list"});

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