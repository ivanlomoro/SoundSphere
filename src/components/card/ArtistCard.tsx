import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { ArtistCardProps, Card, CardImage, CardDescription, SongName, FollowedButton, ArtistActionButtons } from './card.styled.components';


export function ArtistCard({ artist, toggleFollowed, isFollowed }: Partial<ArtistCardProps>) {
    if (!artist) {
        return null;
    }
    if (!toggleFollowed || !isFollowed) {
        return null;
    }

    return (
        <Card>
            <CardImage className="card-img" src={artist.photoUrl} alt={artist.name} />
            <CardDescription>
                <SongName>{artist.name}</SongName>
            </CardDescription>

            <ArtistActionButtons>
                <FollowedButton onClick={() => toggleFollowed(artist)}>
                    {isFollowed(artist.id) ? <AiOutlineStar style={{
                        color: "var(--clr-accent)", height: "30px",
                        width: "30px"
                    }} /> : <AiFillStar />}
                </FollowedButton>
            </ArtistActionButtons>
        </Card>
    );
}
