import { PlayerDisplay } from "../components/playerDisplay/PlayerDisplay"

const example =[
  "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3",
  "https://www.youtube.com/watch?v=LXb3EKWsInQ"
];

export const DisplayPage = () => {
  return (
    <PlayerDisplay media={example}/>
  )
}