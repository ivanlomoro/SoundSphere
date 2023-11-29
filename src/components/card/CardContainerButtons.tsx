import { FC } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { useSongs } from "../../context/songContext/songContext";
import { ArtistActionButtons } from "./card.styled.components";
import { Button } from "..";
import { Songs } from "./SongCard";
import "./CardContainerButtons.styles.css"

export type editSongType = {
    name: string
    url?: string
    thumbnail: string
    isPublic?: boolean
    genreId: string
    artistId?: string
}

type Props = {
    song: Songs
}

const CardContainerButtons: FC<Props> = ({ song }) => {
    const stringId = song.id.toString();

    const { deleteSong, updateSong, errorEditedSong } = useSongs()

    // const editSong: editSongType = {
    //     name: "Prueba 3 modificado pa eliminar",
    //     url: "https://res.cloudinary.com/dmkdsujzh/video/upload/v1644583924/tracks-dev/Rxbyn_-_better_off_alone_fvhwp8.mp3",
    //     thumbnail: "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644583757/tracks-thumbnails-dev/better_off_alone_gfmcby.jpg",
    //     isPublic: true,
    //     genreId: "6560712d54a3139491bfad8f"
    // }

    const handleUpdateSong = async (songId: string, editSong: Songs) => {
        let newName: string

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
            newName = name
            const { value: thumbnail } = await Swal.fire({
                title: "Select image",
                input: "file",
                background: '#111111',
                color: 'white',
                inputAttributes: {
                    "accept": "image/*",
                    "aria-label": "Upload your thumbnail picture"
                },
                inputValue: editSong.thumbnail,
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return "Select your image";
                    }
                }
            }) as { value: File };
            if (thumbnail) {
                const reader = new FileReader();
                reader.onload = (image) => {
                    if (image) {
                        Swal.fire({
                            title: "Your uploaded picture",
                            imageUrl: image.target!.result,
                            imageAlt: "The uploaded picture",
                            confirmButtonText: `Continue&nbsp;<i class="fa fa-arrow-right"></i>`,
                            background: '#111111',
                            color: 'white'
                        } as SweetAlertOptions)
                            .then(async () => {
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
                                            value = editSong.genre
                                            return "You need to choose something!";
                                        }
                                    }
                                }) as { value: string };
                                if (genre) {
                                    Swal.fire({
                                        title: "Edited Song",
                                        html: `<p><b>Name:</b> ${name}<p/> <br> <p><b>Genre:</b> ${genre}<p/>`,
                                        imageUrl: image.target!.result,
                                        imageAlt: "The uploaded picture",
                                        background: '#111111',
                                        color: 'white'
                                    } as SweetAlertOptions)
                                        .then(async () => {
                                            const editSong = {
                                                name: newName,
                                                thumbnail: thumbnail.name,
                                                genreId: "6560712d54a3139491bfad8f",
                                                // isPublic:private
                                            }
                                            console.log("Esto es editSong", editSong);
                                            await updateSong(songId, editSong);
                                            if (errorEditedSong) {
                                                Swal.fire({
                                                    title: 'Updated song!',
                                                    text: 'Your song has been updated.',
                                                    icon: 'success',
                                                    background: '#111111',
                                                    color: 'white'
                                                });
                                            } else {
                                                Swal.fire(
                                                    'Error',
                                                    'There was an error trying to update the song.',
                                                    'error'
                                                );
                                            }

                                        });
                                }
                            });

                    }
                };

                reader.readAsDataURL(thumbnail);
            }



            // const inputOptions = {
            //     true: "Public",
            //     false: "Private"
            // };
            // const { value: privacity } = await Swal.fire({
            //     title: "Select privacity",
            //     input: "radio",
            //     inputOptions,
            //     inputValue: "Private",
            //     inputValidator: (value) => {
            //         if (!value) {
            //             return "You need to choose something!";
            //         }
            //     }
            // });
            // if (privacity) {
            //     Swal.fire({ html: `You selected: ${privacity}` });
            // }

        }
        // updateSong(stringId, editSong)
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