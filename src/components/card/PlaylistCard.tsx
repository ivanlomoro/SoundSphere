import { useNavigate } from 'react-router-dom';
import { Playlist } from '../../Types/PlaylistFormData';
import { useInteractions } from '../../context/userContext/InteractionContext';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import {
    Card,
    CardImage,
    CardDescription,
    SongName,
    FollowedButton,
    ArtistActionButtons,
      FullScreenCard,
    FullScreenImage, 
    FullscreenCardDetails,
    FullScreenCardTitle,
    ListCard,
    ListCardImage,
    ListCardDescription, 
} from './card.styled.components';
import PlaylistActionButtons from './PlaylistActionButtons';


interface PlaylistCardProps {
    playlist: Playlist;
    variant?: 'grid' | 'list' | 'card' | 'fullscreen';
}

export function PlaylistCard({ playlist, variant = "card" }: PlaylistCardProps) {
    const navigate = useNavigate();
    const { isLiked, toggleLiked } = useInteractions()


    if (!playlist) return null;

    const CardComponent = variant === "list" ? ListCard : variant === "fullscreen" ? FullScreenCard : Card;
    const ImageComponent = variant === "list" ? ListCardImage : variant === "fullscreen" ? FullScreenImage : CardImage;
    const DescriptionComponent = variant === "list" ? ListCardDescription : variant === "fullscreen" ? FullscreenCardDetails : CardDescription;

    const handleCardClick = () => {
       
        navigate(`/playlist/${playlist.playlistName}`);
    }

    return (
        <CardComponent onClick={handleCardClick}>
            {variant === "fullscreen" && 
           ( <>
            <FullScreenCardTitle> 
                {playlist.playlistName}
                <span>{playlist.songs.length} songs</span>
                </FullScreenCardTitle><PlaylistActionButtons /></>)}
                
            <ImageComponent src={playlist.thumbnail} alt={playlist.playlistName} />
                
            {variant === "list" && (<>      <ArtistActionButtons>
                <FollowedButton onClick={() => toggleLiked(playlist)}>
                    {isLiked(playlist.playlistName) ? <AiOutlineStar style={{ color: "var(--clr-accent)", height: "30px", width: "30px" }} /> : <AiFillStar />}
                </FollowedButton>
            </ArtistActionButtons>  <DescriptionComponent>
                <SongName>{playlist.playlistName}</SongName><PlaylistActionButtons /> 
            </DescriptionComponent></> ) }
            
           
        </CardComponent>
    );
}
