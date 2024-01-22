import { HeaderSection } from "../components";
import { useRenderer } from '../hooks/useRenderer';
import { useInteractions } from "../context/userContext/InteractionContext";

export const FavoriteSongs = () => {
  const { favorites, } = useInteractions();
  const { renderSongs: renderFavoriteSongs  } = useRenderer({ songs: favorites, layout: "list"});

  return (
    <>
      <HeaderSection text="Favorites" />
      
      <ul>
        {renderFavoriteSongs()}
      </ul>
    </>
  );
};