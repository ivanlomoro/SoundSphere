import { PlayerDisplay } from "../components/playerDisplay/PlayerDisplay";

import { useParams } from "react-router-dom";
import type { Songs } from "../Types/SongsTypes";
import { HeaderSection } from "../components";
import { useApiCalls } from "../context/songContext/ApiCalls";
import { useSongs } from "../context/songContext/songContext";

export const DisplayPage = () => {
  const { toggleFavorite, isFavorite } = useSongs();
  const { publicSongs } = useApiCalls();
  const { name } = useParams();
  const selectedSong = name
    ? selectedSongs?.find((song: Songs) => song.name === name)
    : null;
  const defaultSong = publicSongs[0];
  return (
    <>
      <HeaderSection />
      <PlayerDisplay isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
    </>
  );
};
