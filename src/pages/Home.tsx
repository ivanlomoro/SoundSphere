import { RecentGrid, ScrollableRowComponent } from "../components";
import { RecentGrid, ScrollableRowComponent } from "../components";
import { NavbarHome } from "../components/NavBar/NavbarHome";
import { useApiCalls } from "../context/songContext/ApiCalls";
import { useInteractions } from "../context/userContext/InteractionContext";
import { useRenderer } from "../hooks/useRenderer";
// import { SongList } from "./Songs";

export const Home = () => {
  const { publicSongs } = useApiCalls()

  const { recents, favorites, playlists }  = useInteractions()

  const { renderSongs: renderPublicSongs } = useRenderer({ songs: publicSongs, layout: "card" });
  const { renderSongs : renderRecentsSongs} = useRenderer({ songs: recents,  layout: "grid" });
  const { renderSongs : renderFavoriteSongs} = useRenderer({ songs: favorites,  layout: "card" });
  const { renderPlaylists: renderPlaylists } = useRenderer({ playlists: playlists})


  return (
    <><div>
      <NavbarHome />
    <h2>Song List</h2>
    <ScrollableRowComponent>
      {renderPublicSongs()}
    </ScrollableRowComponent>
<h2>Recently Listended </h2>
    <RecentGrid>
        {renderRecentsSongs()}
      </RecentGrid>
    <h2>Favorites</h2>
    <ScrollableRowComponent>
        {renderFavoriteSongs()}
    </ScrollableRowComponent>
    <h2>Playlist</h2>
    <ScrollableRowComponent>
        {renderPlaylists()}
    </ScrollableRowComponent>

    </div>
      {/* <SongList /> */}
    </>
  );
};
