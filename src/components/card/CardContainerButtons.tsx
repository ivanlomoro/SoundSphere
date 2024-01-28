import { FC } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useSongs } from "../../context/songContext/songContext";
import { Button } from "..";
import "./CardContainerButtons.styles.css";
import { useGenres } from "../../context/genreContext/genreContext";
import { Songs } from "../../Types/SongsTypes";
import styled from "styled-components";
import { GenreType } from "../../Types/GenreTypes";

export type editSongType = {
  name: string;
  url?: string;
  thumbnail?: string;
  isPublic?: boolean;
  genreId: string;
  artistId?: string;
};

type Props = {
  song: Songs;
};

const StyledColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardContainerButtons: FC<Props> = ({ song }) => {
  const stringId = song.id.toString();
  const { deleteSong, updateSong } = useSongs();
  const { apiGenres } = useGenres();

  const genreItems = () => {
    const genres: { [key: string]: string } = {};
    apiGenres.map((genre: GenreType) => {
      genres[genre.id] = genre.name;
    });
    return genres;
  };

  const handleUpdateSong = async (songId: string, editSong: Songs) => {
    const { value: name } = (await Swal.fire({
      title: "Enter the new song name",
      input: "text",
      inputLabel: "Name",
      inputValue: editSong.name,
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
      const { value: genre } = (await Swal.fire({
        title: "Select field validation",
        input: "select",
        inputValue: editSong.Genre.name,
        background: "#111111",
        color: "white",
        inputOptions: genreItems(),
        inputPlaceholder: "Select your genre",
        customClass: "swal2-select option",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            value = editSong.Genre.name;
            return "You need to choose something!";
          }
        },
      })) as { value: string };

      if (genre) {
        const inputOptions = {
          true: "Public",
          false: "Private",
        };
        const { value: privacity } = (await Swal.fire({
          title: "Select privacity",
          input: "radio",
          inputOptions,
          background: "#111111",
          customClass: "swal2-radio",
          color: "white",
          inputValidator: (value) => {
            if (!value) {
              return "You need to choose something!";
            }
          },
        })) as { value: string };
        if (privacity) {
          let newPrivacity: boolean;
          if (privacity === "true") {
            newPrivacity = true;
          } else {
            newPrivacity = false;
          }
          const editedSong = {
            name: name,
            genreId: genre,
            isPublic: newPrivacity,
          };

          try {
            updateSong(songId, editedSong);
          } catch (error) {
            console.error(error);
            Swal.fire(
              "Error",
              "There was an error trying to update the song.",
              "error"
            );
          }
        }
      }
    }
  };

  const handleDeleteSong = async (songId: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure delete this song?",
        text: "You won't be able to revert this.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FF3B4B",
        cancelButtonColor: "#677580",
        confirmButtonText: "Yes, delete it!",
        background: "#111111",
        color: "white",
      });

      if (result.isConfirmed) {
        deleteSong(songId);
      }
    } catch (error) {
      console.error("Error deleting song", error);
    }
  };

  return (
    <StyledColumnContainer>
      <Button
        content={<FaEdit />}
        variant="StyledBackButton"
        onClick={() => {
          handleUpdateSong(stringId, song);
        }}
      />
      <Button
        content={<FaTrash />}
        variant="StyledBackButton"
        onClick={() => {
          handleDeleteSong(stringId);
        }}
      />
    </StyledColumnContainer>
  );
};

export default CardContainerButtons;
