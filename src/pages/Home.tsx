import { ScrollableRowComponent } from "../components";
import { NavbarHome } from "../components/NavBar/NavbarHome";
import MiniPlayer from "../components/miniplayer/useMiniPlayer";
import { useApiCalls } from "../context/songContext/ApiCalls";
import { useInteractions } from "../context/userContext/InteractionContext";
import { useRenderer } from "../hooks/useRenderer";
// import { SongList } from "./Songs";

export const Home = () => {
  const { publicSongs } = useApiCalls()

  const { toggleFavorite, isFavorite, addToRecents } = useInteractions()

  const { renderSongs: renderPublicSongs } = useRenderer({ songs: publicSongs, toggleFavorite, isFavorite, addToRecents, layout: "card" });
  
  return (
    <><div>
      <NavbarHome />
    <h2>Song List</h2>
    <ScrollableRowComponent>
      {renderPublicSongs()}
    </ScrollableRowComponent>
    <MiniPlayer/>
  </div>
      {/* <SongList /> */}
    </>
  );
};
