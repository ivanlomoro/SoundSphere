/* eslint-disable react/react-in-jsx-scope */

import { Button } from '..'
import { NavIcon } from '../NavBar/NavBar'
import { Link } from 'react-router-dom'
import { GridCard, ListCard, Card, GridImageContainer, GridCardImage, ListCardImage, CardImage, GridCardDescription, ListCardDescription, CardDescription, SongName, SongArtist, CommonButtonContainer, FullHeart, EmptyHeart, PlayButton, FaveButton, ArtistActionButtons } from './card.styled.components'
import { AiOutlinePlayCircle } from 'react-icons/ai'
import { FaEdit, FaTrash } from "react-icons/fa";


export interface Songs {
	id: number
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
	isFavorite?: (id: number) => boolean
	isMySong?: boolean
	addToRecents?: (song: Songs) => void
	variant?: 'grid' | 'list' | 'card'
}

export function SongCard({ song, toggleFavorite, isFavorite, addToRecents, variant = 'card', isMySong }: SongCardProps) {
	const CardComponent = variant === 'grid' ? GridCard : variant === 'list' ? ListCard : Card
	const ImageComponent = variant === 'grid' ? GridCardImage : variant === 'list' ? ListCardImage : CardImage
	const DescriptionComponent = variant === 'grid' ? GridCardDescription : variant === 'list' ? ListCardDescription : CardDescription


	if (!song || !toggleFavorite || !isFavorite || !addToRecents) {
		return null
	}





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
					/>
				</ArtistActionButtons>}
		</CardComponent>
	)
}
