import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlaylistContext } from "../context/playlistContext/PlayListContext";
import { HeaderSection } from "../components";
import { PlaylistType } from "../interfaces/PlaylistType";
import { useRenderer } from "../hooks/useRenderer";


const AlbumDisplayPage = () => {
  const { playlistId } = useParams();
  const { getMusicByPlaylist, userPlaylists, songs } = useContext(PlaylistContext);
  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistType | null>(null);
  const { renderSongs: renderPlaylistSongs  } = useRenderer({ songs: songs, layout: "list"});
  useEffect(() => {
    if (userPlaylists) {
      const playlist = userPlaylists.find((playlist) => playlist.id === playlistId);
      if (playlist) {
        setSelectedPlaylist(playlist);
        getMusicByPlaylist(playlist.id, playlist.playlistName);
      }
    }
  }, [playlistId, userPlaylists]);

  const navigate = useNavigate();
  console.log(selectedPlaylist)
  return (
    <>
      <HeaderSection
        text={selectedPlaylist?.playlistName}
        withBackButton={true}
        arrowBackAction={() => navigate(-1)}
      />

      <div>
        {selectedPlaylist && (
          <>
            <ul>
              {renderPlaylistSongs()}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default AlbumDisplayPage;