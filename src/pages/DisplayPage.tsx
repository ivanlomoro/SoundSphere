import { PlayerDisplay } from "../components/playerDisplay/PlayerDisplay"

const example =[
  "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3",
  "https://res.cloudinary.com/dmkdsujzh/video/upload/v1644587961/tracks-dev/Kuzinmuzin_-_Sax_Is_My_Cardio_fqmvwb.mp3",
  "https://res.cloudinary.com/dmkdsujzh/video/upload/v1644602494/tracks-dev/D_JAY_KOI_-_We_got_the_vibes___Feat_Fil_Straughan__uz9qw7.mp3"
];

export const DisplayPage = () => {
  return (
    <PlayerDisplay media={example}/>
  )
}