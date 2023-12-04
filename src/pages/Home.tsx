import {
  HeaderSection,
  RecentGrid,
  ScrollableRowComponent,
  WelcomeUserSection,
} from "../components";
import { useApiCalls } from "../context/songContext/ApiCalls";
import { useInteractions } from "../context/userContext/InteractionContext";
import { useRenderer } from "../hooks/useRenderer";

export const Home = () => {
  const { publicSongs } = useApiCalls();

  const { recents, favorites, playlists } = useInteractions();
  const { renderSongs: renderPublicSongs } = useRenderer({
    songs: publicSongs,
    layout: "card",
  });
  const { renderSongs: renderRecentsSongs } = useRenderer({
    songs: recents,
    layout: "grid",
  });
  const { renderSongs: renderFavoriteSongs } = useRenderer({
    songs: favorites,
    layout: "card",
  });
  const { renderPlaylists: renderPlaylists } = useRenderer({
    playlists: playlists,
    layout: "card",
  });

  return (
    <>
      <HeaderSection text="SoundSphere" withBackButton={false} />
      <div>
        <WelcomeUserSection />
        <h3>Song List</h3>
        <ScrollableRowComponent>{renderPublicSongs()}</ScrollableRowComponent>
        {recents.length > 0 && (
          <>
            <h2>Recently Listended </h2>
            <RecentGrid>{renderRecentsSongs()}</RecentGrid>
          </>
        )}
        {favorites.length > 0 && (
          <>
            <h2>Favorites</h2>
            <ScrollableRowComponent>
              {renderFavoriteSongs()}
            </ScrollableRowComponent>
          </>
        )}
        {playlists.length > 0 && (
          <>
            <h2>Playlist</h2>
            <ScrollableRowComponent>{renderPlaylists()}</ScrollableRowComponent>
          </>
        )}
      </div>
      {/* <SongList /> */}
    </>
  );
};
