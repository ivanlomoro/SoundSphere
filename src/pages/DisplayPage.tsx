import { PlayerDisplay } from "../components/playerDisplay/PlayerDisplay";
import db from "../data/db.json";

import { useParams } from "react-router-dom";
import type { Songs} from "../Types/SongsTypes"
import { HeaderSection } from "../components";
import { useSongs } from "../context/songContext/songContext";


export const DisplayPage = () => {
  const { mySongs} = useSongs();
  
  const { name } = useParams();
  const selectedSong = name
    ? mySongs?.find((song: Songs) => song.name === name)
    : null;
  const defaultSong = mySongs[0];
  return (
    <>
      <HeaderSection />
      <PlayerDisplay
        songs={mySongs}
        currentSong={selectedSong ? selectedSong : defaultSong}
      />
    </>
  );
};
