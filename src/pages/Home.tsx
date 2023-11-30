import { RecentGrid, ScrollableRowComponent } from "../components";
import { NavbarHome } from "../components/NavBar/NavbarHome";
import { useApiCalls } from "../context/songContext/ApiCalls";
import { useInteractions } from "../context/userContext/InteractionContext";
import { useRenderer } from "../hooks/useRenderer";
// import { SongList } from "./Songs";

export const Home = () => {
  const { publicSongs } = useApiCalls()

  const { toggleFavorite, isFavorite, addToRecents, recents, favorites, selectedSongs } = useInteractions()

  const { renderSongs: renderPublicSongs } = useRenderer({ songs: publicSongs, toggleFavorite, isFavorite, addToRecents, layout: "card" });
  const { renderSongs : renderRecentsSongs} = useRenderer({ songs: recents, toggleFavorite, isFavorite, addToRecents, layout: "grid" });
  const { renderSongs : renderFavoriteSongs} = useRenderer({ songs: favorites, toggleFavorite, isFavorite, addToRecents, layout: "card" });
  const { renderSongs : rendersSelectedSongs} = useRenderer({ songs: selectedSongs, toggleFavorite, isFavorite, addToRecents, layout: "card" }); 


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
        {rendersSelectedSongs()}
    </ScrollableRowComponent>

  </div>
      {/* <SongList /> */}
    </>
  );
};
