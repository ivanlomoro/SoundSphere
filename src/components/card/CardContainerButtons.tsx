import { FC } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import { useSongs } from "../../context/songContext/songContext";
import { ArtistActionButtons } from "./card.styled.components";
import { Button } from "..";

export type editSongType = {
    name: string
    url: string
    thumbnail: string
    isPublic: boolean
    genreId: string
    artistId?: string
}

type Props ={
    songId:number
}

const { deleteSong, updateSong } = useSongs()

const editSong: editSongType = {
    name: "Prueba 3 pa eliminar",
    url: "https://res.cloudinary.com/dmkdsujzh/video/upload/v1644583924/tracks-dev/Rxbyn_-_better_off_alone_fvhwp8.mp3",
    thumbnail: "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644583757/tracks-thumbnails-dev/better_off_alone_gfmcby.jpg",
    isPublic: true,
    genreId: "6560712d54a3139491bfad8f"
}

const handleDeleteMovie = async (songId: string) => {
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
        console.error('Error deleting movie', error);
        Swal.fire(
            'Error',
            'There was an error trying to delete the movie.',
            'error'
        );
    }
};


const CardContainerButtons: FC<Props> = ({songId}) => {
    const stringId = songId.toString();
    console.log("Este es el stringId XD", stringId)
    return (
        <ArtistActionButtons>
            <Button
                content={<FaEdit />}
                onClick={() => { updateSong(stringId, editSong) }}
                variant="StyledBackButton"
            />
            <Button
                content={<FaTrash />}
                variant="StyledBackButton"
                onClick={() => { handleDeleteMovie(stringId) }}
            />
            <button>hola</button>
        </ArtistActionButtons>
    )
}

export default CardContainerButtons