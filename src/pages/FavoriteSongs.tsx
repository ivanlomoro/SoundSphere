import { HeaderSection } from "../components/header/Header";
import { useRenderer } from "../hooks/useRenderer";
import { useInteractions } from "../context/userContext/InteractionContext";
import { useNavigate } from "react-router-dom";

export const FavoriteSongs = () => {
  const { favorites } = useInteractions();
  const { renderSongs: renderFavoriteSongs } = useRenderer({
    songs: favorites,
    layout: "list",
  });
  const navigate = useNavigate();
  return (
    <>
      <HeaderSection
        text="Favorites"
        withBackButton={true}
        arrowBackAction={() => navigate(-1)}
      />

      <ul>{renderFavoriteSongs()}</ul>
    </>
  );
};
