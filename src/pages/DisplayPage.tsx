import { PlayerDisplay } from "../components/playerDisplay/PlayerDisplay";


import { useParams } from "react-router-dom";
import type { Songs} from "../Types/SongsTypes"
import { HeaderSection } from "../components";
import { useSongs } from "../context/songContext/songContext";


export const DisplayPage = () => {
  const { songs} = useSongs();
  
  const { name } = useParams();
  const selectedSong = name
    ? songs?.find((song: Songs) => song.name === name)
    : null;
  const defaultSong = songs[0];
  return (
    <>
      <HeaderSection />
      <PlayerDisplay
        songs={songs}
        currentSong={selectedSong ? selectedSong : defaultSong}
      />
    </>
  );
};
