import Swal from "sweetalert2";
import { HeaderSection } from "../components/header/Header";
import { Button } from "../components/button/Button";
import { useContext } from "react";
import { PlaylistContext } from "../context/playlistContext/PlayListContext";
import styled from "styled-components";
import PlaylistCard from "../components/playlists/PlaylistCard";

const AddToListContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2;
  background-color: var(--clr-bg-primary);
  overflow-y: scroll;
  padding: var(--space-md);
`;

const PlaylistsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  margin-top: var(--space-md);
`;

const AddToPlayList = () => {
  const {
    songForPlaylist: song,
    setSongForPlaylist,
    userPlaylists,
    createPlaylist,
  } = useContext(PlaylistContext);

  const createPlayList = async (songId: string, thumbnail: string) => {
    const { value: name } = (await Swal.fire({
      title: "Enter the new playlist name",
      input: "text",
      inputLabel: "Name",
      inputValue: "",
      showCancelButton: true,
      background: "#111111",
      color: "#fff",
      confirmButtonColor: "#bd00ff",

      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    })) as { value: string };
    if (name) {
      try {
        await createPlaylist(songId, name, thumbnail);
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (song && song.id) {
    return (
      <AddToListContainer>
        <HeaderSection
          text="Add to list"
          withBackButton={true}
          arrowBackAction={() => setSongForPlaylist(null)}
        />
        <Button
          content="New Playlist"
          onClick={() => createPlayList(song.id, song.thumbnail)}
        />
        {userPlaylists && (
          <PlaylistsContainer>
            {userPlaylists?.map((playlist, index) => (
              <PlaylistCard key={index} playlist={playlist} />
            ))}
          </PlaylistsContainer>
        )}
      </AddToListContainer>
    );
  }
};
export default AddToPlayList;
