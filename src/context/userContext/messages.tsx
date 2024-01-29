import Swal from "sweetalert2";
import { Playlist } from "../../Types/PlaylistFormData";
import { useInteractions } from "./InteractionContext";
import { useNavigate } from "react-router-dom";

export const useSwal = () => {
  const { removeFromPlaylists, updatePlaylist, createNewPlaylist } =
    useInteractions();
  const navigate = useNavigate();
  const handleDeletePlaylist = async (frontId: Playlist["frontId"]) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure you want to delete this playlist?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#bd00ff",
        cancelButtonColor: "#677580",
        confirmButtonText: "Yes, delete it!",
        background: "#111111",
        color: "white",
      });

      if (result.isConfirmed) {
        removeFromPlaylists(frontId);
        navigate("/home");
      }
    } catch (error) {
      console.error("Error deleting playlist", error);
    }
  };

  const handleUpdatePlaylist = async (frontId: Playlist["frontId"]) => {
    try {
      const { value: playlistName } = await Swal.fire({
        title: "New Name!",
        input: "text",
        inputLabel: "Name",
        inputValue: "New Name here!",
        showCancelButton: true,
        background: "#111111",
        color: "white",
        confirmButtonColor: "#bd00ff",
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
        },
      });

      if (playlistName) {
        updatePlaylist(frontId, playlistName);
      }
    } catch (error) {
      console.error("Error updating playlist", error);
    }
  };

  const handleCreatePlaylist = async (playlist: Playlist) => {
    try {
      const { value: newName } = await Swal.fire({
        title: "Start fresh",
        input: "text",
        inputLabel: "Name",
        showCancelButton: true,
        background: "#111111",
        color: "white",
        confirmButtonColor: "#bd00ff",
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
        },
      });

      if (newName) {
        createNewPlaylist(playlist, newName);
      }
    } catch (error) {
      console.error("Error creating playlist", error);
    }
  };

  return { handleDeletePlaylist, handleUpdatePlaylist, handleCreatePlaylist };
};
