import { useInteractions } from "../context/userContext/InteractionContext";
import { useRenderer } from "../hooks/useRenderer";
import { HeaderSection } from "../components/header/Header";

const PlaylistPage = () => {
  const { playlists } = useInteractions();
  const { renderPlaylists: renderSlectedPlaylist } = useRenderer({
    playlists: playlists,
    layout: "list",
  });

  return (
    <>
      <HeaderSection text="Playlists" />
      <ul>
        <h2> Playlists</h2>
        {playlists?.length != 0 ? (
          renderSlectedPlaylist()
        ) : (
          <p>No playlists found</p>
        )}
      </ul>
    </>
  );
};

export default PlaylistPage;
