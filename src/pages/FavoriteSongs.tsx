
import { HeaderSection } from "../components";
import { useRenderer } from '../hooks/useRenderer';
import { useInteractions } from "../context/userContext/InteractionContext";



export const FavoriteSongs = () => {
  const { selectedSongs, } = useInteractions();
  const { renderSongs: renderFavoriteSongs  } = useRenderer({ songs: selectedSongs, layout: "list"});

  return (
    <>
      <HeaderSection text="Playlists" />
      <ul>
        <h2> Playlists</h2>
        {renderFavoriteSongs()}
      </ul>
    </>
  );
};
  