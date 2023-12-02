import { PlayerDisplay } from "../components/playerDisplay/PlayerDisplay";


import { useParams } from "react-router-dom";
import type { Songs} from "../Types/SongsTypes"
import { HeaderSection } from "../components";
import { useApiCalls } from "../context/songContext/ApiCalls";
import { useInteractions } from "../context/userContext/InteractionContext";



export const DisplayPage = () => {
  const { publicSongs } = useApiCalls()
  const { selectedSongs } = useInteractions()
  const { name } = useParams();
  const selectedSong = name
    ? selectedSongs?.find((song: Songs) => song.name === name)
    : null;
  const defaultSong = publicSongs[0];
  return (
    <>
      <HeaderSection />
      <PlayerDisplay
        songs={selectedSongs}
        currentSong={selectedSong ? selectedSong : defaultSong}
      />
    </>
  );
};
