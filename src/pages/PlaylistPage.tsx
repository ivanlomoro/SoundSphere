
import { useInteractions } from '../context/userContext/InteractionContext'
import { useRenderer } from '../hooks/useRenderer';
import { HeaderSection } from '../components';

export const PlaylistPage = () => {
    const { selectedSongs, addToRecents, toggleSelected, isSelected } = useInteractions();
  const { renderSongs: renderPlaylistSongs } = useRenderer({ songs: selectedSongs,  layout: "list",toggleSelected, isSelected, addToRecents });

  return (
    <>
          <HeaderSection text="Playlists" />
          <ul>
            <h2> Playlists</h2>
            { renderPlaylistSongs() }
          </ul>
    </>
  );
};

