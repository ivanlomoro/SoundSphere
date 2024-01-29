import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlaylistContext } from "../context/playlistContext/PlayListContext";
import { HeaderSection } from "../components/header/Header";
import { PlaylistType } from "../interfaces/PlaylistType";
import { AlbumSongCard } from "../components/card/AlbumSongCard";
import { ListSongsContainer } from "./albumDisplayPage";
import { useInteractions } from "../context/userContext/InteractionContext";
import { PlayerContext } from "../context/playerContext/playerContext";
import { PlaylistHeader } from "../components/albumHeader/albumHeader";
import deleteData from "../api/deleteApi";
import toast from "react-hot-toast";
import { StyledInvisibleUnderLinedButton } from "../components/button/Button";

const PlaylistDisplayPage = () => {
  const { playlistId } = useParams();
  const { getMusicByPlaylist, userPlaylists, songs, setUserPlaylists } =
    useContext(PlaylistContext);
  const { setCurrentSong, setCurrentList, setPlaying } =
    useContext(PlayerContext);
  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistType | null>(
    null
  );
  const { addToRecents } = useInteractions();

  const navigate = useNavigate();

  const handlePlaylistDelete = async () => {
    const res = await deleteData(`playlist/${playlistId}`);
    if (typeof res === "string") toast.error("Can't delete this playlist");
    if (typeof res !== "string") {
      setUserPlaylists((prevUserPlaylist: PlaylistType[] | null) => {
        return (
          prevUserPlaylist &&
          prevUserPlaylist.filter((playlist) => {
            return playlist.id !== playlistId;
          })
        );
      });

      await toast.success("Playlist deleted successfully");
      navigate("/favorites");
    }
  };

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

  return (
    <>
      <HeaderSection
        text={" "}
        withBackButton={true}
        arrowBackAction={() => navigate(-1)}
      />

      {playlistId && (
        <StyledInvisibleUnderLinedButton
          onClick={() => {
            handlePlaylistDelete();
          }}
        >
          Delete Playlist
        </StyledInvisibleUnderLinedButton>
      )}

      {selectedPlaylist && <PlaylistHeader playlist={selectedPlaylist} />}

      <div>
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
