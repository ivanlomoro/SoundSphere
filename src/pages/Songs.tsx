import { RecentGrid } from "../components/homeContainers/FavoritesGrid";
import { ScrollableRowComponent } from "../components/homeContainers/ScrollableRow";
import { useSongs } from "../context/songContext/songContext";
import { useInteractions } from "../context/userContext/InteractionContext";
import { useRenderer } from "../hooks/useRenderer";

export const SongList = () => {
  const { songs } = useSongs();
  const { favorites, recents } = useInteractions();
  const { renderSongs: renderNormalSongs } = useRenderer({
    songs: songs,
    layout: "card",
  });
  const { renderSongs: renderFavoriteSongs } = useRenderer({
    songs: favorites,
    layout: "card",
  });
  const { renderSongs: renderRecentSongs } = useRenderer({
    songs: recents,
    layout: "grid",
  });

  return (
    <div>
      <div>
        <h2>Song List</h2>
        <ScrollableRowComponent>{renderNormalSongs()}</ScrollableRowComponent>
      </div>

      <div>
        <h2>Recently Played</h2>
        <RecentGrid>{renderRecentSongs()}</RecentGrid>
      </div>

      <div>
        <h2>Favorites</h2>
        <ScrollableRowComponent>{renderFavoriteSongs()}</ScrollableRowComponent>
      </div>
    </div>
  );
};
