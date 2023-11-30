import { FC } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import { useSongs } from "../../context/songContext/songContext";
import { ArtistActionButtons } from "./card.styled.components";
import { Button } from "..";
import { Songs } from "./SongCard";
import "./CardContainerButtons.styles.css"

export type editSongType = {
    name: string
    url?: string
    thumbnail?: string
    isPublic?: boolean
    genreId: string
    artistId?: string
}

type Props = {
    song: Songs
}

const CardContainerButtons: FC<Props> = ({ song }) => {
    const stringId = song.id.toString();

    const { deleteSong, updateSong } = useSongs()

    // const editSong: editSongType = {
    //     name: "Prueba 3 modificado pa eliminar",
    //     url: "https://res.cloudinary.com/dmkdsujzh/video/upload/v1644583924/tracks-dev/Rxbyn_-_better_off_alone_fvhwp8.mp3",
    //     thumbnail: "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644583757/tracks-thumbnails-dev/better_off_alone_gfmcby.jpg",
    //     isPublic: true,
    //     genreId: "6560712d54a3139491bfad8f"
    // }

    const handleUpdateSong = async (songId: string, editSong: Songs) => {

        const { value: name } = await Swal.fire({
            title: "Enter the new song name",
            input: "text",
            inputLabel: "Name",
            inputValue: editSong.name,
            showCancelButton: true,
            background: '#111111',
            color: 'white',
            inputValidator: (value) => {
                if (!value) {
                    return "You need to write something!";
                }
            }
        }) as { value: string };

        if (name) {
            const { value: genre } = await Swal.fire({
                title: "Select field validation",
                input: "select",
                inputValue: editSong.genre,
                background: '#111111',
                color: 'white',
                inputOptions: {
                    rock: "Rock",
                    pop: "Pop",
                    punk: "Punk",
                    rap: "Rap"
                },
                inputPlaceholder: "Select your genre",
                customClass: "swal2-select option",
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        value = editSong.genre;
                        return "You need to choose something!";
                    }
                }
            }) as { value: string };

            if (genre) {
                const inputOptions = {
                    true: "Public",
                    false: "Private"
                };
                const { value: privacity } = await Swal.fire({
                    title: "Select privacity",
                    input: "radio",
                    inputOptions,
                    background: '#111111',
                    customClass: "swal2-radio",
                    color: 'white',
                    inputValidator: (value) => {
                        if (!value) {
                            return "You need to choose something!";
                        }
                    }
                }) as { value: string };
                if (privacity) {
                    let newPrivacity: boolean
                    if (privacity === "true") {
                        newPrivacity = true
                    } else {
                        newPrivacity = false
                    }
                    const editedSong = {
                        name: name,
                        genreId: "6560712d54a3139491bfad8f",
                        isPublic: newPrivacity
                    };

                    console.log("Esto es editedSong", editedSong);
                    try {
                        const response = await updateSong(songId, editedSong);
                        console.log("Estamos en el try");
                        console.log("Esto es updateSong-response:", response);

                    } catch (error) {
                        console.error(error);
                        Swal.fire(
                            'Error',
                            'There was an error trying to update the song.',
                            'error'
                        );
                        console.log("Estamos en el catch");
                    }
                }
            }




            // updateSong(stringId, editSong)

        }
    }


    const handleDeleteSong = async (songId: string) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure delete this song?',
                text: 'You won\'t be able to revert this.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#FF3B4B',
                cancelButtonColor: '#677580',
                confirmButtonText: 'Yes, delete it!',
                background: '#111111',
                color: 'white'
            });

            if (result.isConfirmed) {
                await deleteSong(songId);
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your song has been deleted.',
                    icon: 'success',
                    background: '#111111',
                    color: 'white'
                });
            }
        } catch (error) {
            console.error('Error deleting song', error);
            Swal.fire(
                'Error',
                'There was an error trying to delete the song.',
                'error'
            );
        }
    };

    return (
        <ArtistActionButtons>
            <Button
                content={<FaEdit />}
                variant="StyledBackButton"
                onClick={() => { handleUpdateSong(stringId, song) }}
            />
            <Button
                content={<FaTrash />}
                variant="StyledBackButton"
                onClick={() => { handleDeleteSong(stringId) }}
            />
        </ArtistActionButtons>
    )
}


export default CardContainerButtons