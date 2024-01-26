import { useEffect, useState } from "react";
import {
  HeaderSection,
  RecentGrid,
  ScrollableRowComponent,
  WelcomeUserSection,
} from "../components";
import { useApiCalls } from "../context/songContext/ApiCalls";
import { useInteractions } from "../context/userContext/InteractionContext";
import { useRenderer } from "../hooks/useRenderer";
import { Songs } from "../Types/SongsTypes";

export const Home = () => {
  const { publicSongs, apiError } = useApiCalls();
  const [allSongs, setAllSongs ] = useState<Songs[]>(publicSongs)

  console.log("publicSongs", apiError, publicSongs)
  useEffect(() => {
    setAllSongs(publicSongs)
  }, [publicSongs, apiError])

  const { recents, favorites, playlists } = useInteractions();
  const { renderSongs: renderPublicSongs } = useRenderer({
    songs: allSongs,
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
     {  !apiError ? <ScrollableRowComponent>{renderPublicSongs()}</ScrollableRowComponent> : <h1>test = api error </h1>}
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
