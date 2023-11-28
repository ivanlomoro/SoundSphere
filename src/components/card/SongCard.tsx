/* eslint-disable react/react-in-jsx-scope */

import { Button } from '..'
import { NavIcon } from '../NavBar/NavBar'
import { Link } from 'react-router-dom'
import { GridCard, ListCard, Card, GridImageContainer, GridCardImage, ListCardImage, CardImage, GridCardDescription, ListCardDescription, CardDescription, SongName, SongArtist, CommonButtonContainer, FullHeart, EmptyHeart, PlayButton, FaveButton, ArtistActionButtons } from './card.styled.components'
import { AiOutlinePlayCircle } from 'react-icons/ai'
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSongs } from '../../context/songContext/songContext'
import Swal from 'sweetalert2';


export interface Songs {
	id: string
	name: string
	artist: string
	url: string
	thumbnail: string
	genre: string
	liked: boolean
}

interface SongCardProps {
	song: Songs
	toggleFavorite?: (song: Songs) => void
	isFavorite?: (id: string) => boolean
	isMySong?: boolean
	addToRecents?: (song: Songs) => void
	variant?: 'grid' | 'list' | 'card'
}

export function SongCard({ song, toggleFavorite, isFavorite, addToRecents, variant = 'card', isMySong }: SongCardProps) {
	const CardComponent = variant === 'grid' ? GridCard : variant === 'list' ? ListCard : Card
	const ImageComponent = variant === 'grid' ? GridCardImage : variant === 'list' ? ListCardImage : CardImage
	const DescriptionComponent = variant === 'grid' ? GridCardDescription : variant === 'list' ? ListCardDescription : CardDescription

	const { deleteSong } = useSongs()

	if (!song || !toggleFavorite || !isFavorite || !addToRecents) {
		return null
	}

	const handleDeleteMovie = async (songId: string) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure delete this movie?',
                text: 'You won\'t be able to revert this.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#FF3B4B',
                cancelButtonColor: '#677580',
                confirmButtonText: 'Yes, delete it!',
				background:'#111111',
				color:'white'
            });

            if (result.isConfirmed) {
                await deleteSong(songId);
                Swal.fire(
                    'Deleted!',
                    'Your movie has been deleted.',
                    'success'
                );
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

	return (
		<CardComponent>
			{variant === 'grid' && (
				<Link to={`/displaypage/${song.name}`}>
					<GridImageContainer>
						<ImageComponent src={song.thumbnail} alt={song.name} />
						<PlayButton onClick={() => { addToRecents(song) }} />
					</GridImageContainer>
				</Link>
			)}

			{(variant != 'grid') && (
				<ImageComponent src={song.thumbnail} alt={song.name} />
			)}

			<DescriptionComponent>
				<div>
					<SongName>{song.name}</SongName>
					<SongArtist>{song.artist}</SongArtist>
				</div>
				{variant != 'grid' && (
					<CommonButtonContainer>
						<Link to={`/displaypage/${song.name}`}>

							<Button
								variant="StyledButtonNav"
								content={<NavIcon icon={AiOutlinePlayCircle} />}
								ariaLabel="Music Player"
								onClick={() => { addToRecents(song) }}
							/> </Link>

						<FaveButton onClick={() => { toggleFavorite(song) }}>
							{isFavorite(song.id) ? <FullHeart /> : <EmptyHeart />}
						</FaveButton>

						{/* <FavoriteButton onClick={() => { toggleFavorite(song) }}>
						{isFavorite(song.id) ? <FullHeart /> : <EmptyHeart />}
					</FavoriteButton>  */}

					</CommonButtonContainer>)}
			</DescriptionComponent>
			{isMySong &&
				<ArtistActionButtons>
					<Button
						content={<FaEdit />}
						// onClick={editSong}
						variant="StyledBackButton"
					/>
					<Button
						content={<FaTrash />}
						// onClick={deleteSong}
						variant="StyledBackButton"
						onClick={() => { handleDeleteMovie(song.id)}}
					/>
				</ArtistActionButtons>}
		</CardComponent>
	)
}
