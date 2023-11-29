import { ScrollableRowComponent } from "../components";
import { NavbarHome } from "../components/NavBar/NavbarHome";
import { useApiCalls } from "../context/songContext/ApiCalls";
import { useSongs } from "../context/songContext/songContext";
import { useInteractions } from "../context/userContext/InteractionContext";
import { useRenderer } from "../hooks/useRenderer";

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

  </div>
      {/* <SongList /> */}
    </>
  );
};
