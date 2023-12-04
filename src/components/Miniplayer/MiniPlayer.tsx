import { useContext, useState } from "react";
import { PlayerContext } from "../../context/playerContext/playerContext";
import { HiddenPlayer } from "../playerDisplay/PlayerDisplay";
import ReactPlayer from "react-player";

const MiniPlayer = () => {
  const { currentSong: songFromContext, currentList: songs } =
    useContext(PlayerContext);

  const currentSong = songFromContext ? songFromContext : songs[0];

  if (!currentSong) return null;

  return (
    <>
      <h1>hola</h1>
      {/* <HiddenPlayer>
        <ReactPlayer
          url={currentSong}
          playing={playing}
          ref={playerRef}
          controls={false}
          width="100%"
          height="100%"
          onProgress={handleProgress}
          onDuration={handleDuration}
        />
      </HiddenPlayer> */}
    </>
  );
};
export default MiniPlayer;
