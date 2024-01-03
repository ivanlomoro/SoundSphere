import Swal from "sweetalert2";
import { Button } from "../components";
import { useParams } from "react-router-dom";
import { useSongs } from "../context/songContext/songContext";

const AddToPlayListPage = () => {
  const { songId } = useParams();
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
        const response = await createPlaylist(
          songId,
          name,
          "https://res.cloudinary.com/dnmoqsjh7/image/upload/v1701301482/thumbnail/qnujgmf2vrjcascxidtt.jpg"
        );
        console.log("PLAYLIST CREATED!");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Button content="New Playlist" onClick={() => createPlayList(songId)} />
  );
};
export default AddToPlayListPage;
