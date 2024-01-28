import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlaylistContext } from "../context/playlistContext/PlayListContext";
import { HeaderSection } from "../components";
import { PlaylistType } from "../interfaces/PlaylistType";
// import { useRenderer } from "../hooks/useRenderer";
import { AlbumSongCard } from "../components/card/AlbumSongCard";
import { ListSongsContainer } from "./albumDisplayPage";
import { useInteractions } from "../context/userContext/InteractionContext";
import { PlayerContext } from "../context/playerContext/playerContext";
import { PlaylistHeader } from "../components/albumHeader/albumHeader";

const PlaylistDisplayPage = () => {
  const { playlistId } = useParams();
  const { getMusicByPlaylist, userPlaylists, songs } =
    useContext(PlaylistContext);
  const { setCurrentSong, setCurrentList, setPlaying } =
    useContext(PlayerContext);
  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistType | null>(
    null
  );
  const { addToRecents } = useInteractions();
  // const { renderSongs: renderPlaylistSongs } = useRenderer({
  //   songs: songs,
  //   layout: "list",
  // });

  useEffect(() => {
    if (userPlaylists) {
      const playlist = userPlaylists.find(
        (playlist) => playlist.id === playlistId
      );
      if (playlist) {
        setSelectedPlaylist(playlist);
        getMusicByPlaylist(playlist.id, playlist.playlistName);
      }
    }
  }, [playlistId, userPlaylists]);

  const navigate = useNavigate();

  return (
    <>
      <HeaderSection
        text={" "}
        withBackButton={true}
        arrowBackAction={() => navigate(-1)}
      />

      {selectedPlaylist && <PlaylistHeader playlist={selectedPlaylist} />}

      <div>
        {/* {selectedPlaylist && (
          <>
            <ul>{renderPlaylistSongs()}</ul>
          </>
        )} */}
        {selectedPlaylist && (
          <ListSongsContainer className="list-none">
            {songs.map((song, index) => (
              <li
                key={index}
                onClick={() => {
                  addToRecents(song);
                  setCurrentList(songs);
                  setCurrentSong(song);
                  setPlaying(true);
                }}
              >
                <AlbumSongCard song={song} isPlaylist={true} />
              </li>
            ))}
          </ListSongsContainer>
        )}
      </div>
    </>
  );
};

export default PlaylistDisplayPage;
