import { PlayerDisplay } from "../components/playerDisplay/PlayerDisplay";


import { useParams } from "react-router-dom";
import type { Songs} from "../Types/SongsTypes"
import { HeaderSection } from "../components";
import { useApiCalls } from "../context/songContext/ApiCalls";


export const DisplayPage = () => {
  const { publicSongs } = useApiCalls()
  const { name } = useParams();
  const selectedSong = name
    ? publicSongs?.find((song: Songs) => song.name === name)
    : null;
  const defaultSong = publicSongs[0];
  return (
    <>
      <HeaderSection />
      <PlayerDisplay
        songs={publicSongs}
        currentSong={selectedSong ? selectedSong : defaultSong}
      />
    </>
  );
};
