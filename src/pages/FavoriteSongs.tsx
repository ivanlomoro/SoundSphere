
import { HeaderSection } from "../components";
import { useRenderer } from '../hooks/useRenderer';
import { useInteractions } from "../context/userContext/InteractionContext";



export const FavoriteSongs = () => {
  const { selectedSongs, addToRecents, toggleSelected, isSelected } = useInteractions();
  const { renderSongs: renderPlaylistSongs } = useRenderer({ songs: selectedSongs, layout: "list", toggleSelected, isSelected, addToRecents });

  return (
    <>
      <HeaderSection text="Playlists" />
      <ul>
        <h2> Playlists</h2>
        {renderPlaylistSongs()}
      </ul>
    </>
  );
};
  