import Swal from "sweetalert2";
import { Button } from "../components";
import { useSongs } from "../context/songContext/songContext";
import { useContext } from "react";
import { PlaylistContext } from "../context/playlistContext/PlayListContext";

const AddToPlayList = () => {
  const { songForPlaylist: song, setSongForPlaylist } =
    useContext(PlaylistContext);
  const { createPlaylist } = useSongs();

  const createPlayList = async (songId: string) => {
    const { value: name } = (await Swal.fire({
      title: "Enter the new playlist name",
      input: "text",
      inputLabel: "Name",
      inputValue: "",
      showCancelButton: true,
      background: "#111111",
      color: "white",
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    })) as { value: string };
    if (name) {
      try {
        await createPlaylist(
          songId,
          name,
          "https://res.cloudinary.com/dnmoqsjh7/image/upload/v1701301482/thumbnail/qnujgmf2vrjcascxidtt.jpg"
        );
        setSongForPlaylist(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (song && song.id) {
    return (
      <Button content="New Playlist" onClick={() => createPlayList(song.id)} />
    );
  }
};
export default AddToPlayList;
