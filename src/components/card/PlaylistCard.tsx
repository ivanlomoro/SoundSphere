import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Card, CardImage, CardDescription, SongName, FollowedButton, ArtistActionButtons } from './card.styled.components';
import { Playlist } from '../../Types/PlaylistFormData';
import { useInteractions } from '../../context/userContext/InteractionContext';
interface PlaylistCardProps {
    playlist: Playlist

}



export function PlaylistCard({playlist } :PlaylistCardProps) {
const {isLiked, toggleLiked} = useInteractions();
    if (!playlist) {
        return null;
    }
    

    return (
        <Card>
            <CardImage className="card-img" src={playlist.thumbnail} alt={playlist.playlistName} />
            <CardDescription>
                <SongName>{playlist.playlistName}</SongName>

            </CardDescription>


            <ArtistActionButtons>

                <FollowedButton onClick={() => toggleLiked(playlist)}>
                    {isLiked(playlist.playlistName) ? <AiOutlineStar style={{
                        color: "var(--clr-accent)", height: "30px",
                        width: "30px"
                    }} /> : <AiFillStar />}
                </FollowedButton>

            </ArtistActionButtons>
        </Card>
    );


}
