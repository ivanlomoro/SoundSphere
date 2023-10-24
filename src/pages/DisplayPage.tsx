import { PlayerDisplay } from "../components/playerDisplay/PlayerDisplay"
import db from "../data/db.json";

import { useParams } from 'react-router-dom';
import { Songs } from "./Songs";



export const DisplayPage = () => {
  const songs = db.songData

    const { name } = useParams()

    const selectedSong = name? songs?.find((song:Songs)=> song.name === name) : null

    const defaultSong = songs[0]


  return (
    <PlayerDisplay songs={songs} currentSong={selectedSong? selectedSong : defaultSong }/>
  )
}