import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { ArtistCardProps, Card, CardImage, CardDescription, SongName, FollowedButton } from './PlaylistsCard';


export function ArtistCard({ artist, toggleFollowed, isFollowed}:Partial<ArtistCardProps> ) {
    
    if (!artist) {
        return null;
    }
    if (!toggleFollowed || !isFollowed ) {
        return null;
    }

    return (
        <Card>
            <CardImage className="card-img" src={artist.photoUrl} alt={artist.name} />
            <CardDescription>
                <SongName>{artist.name}</SongName>
               
            </CardDescription>
          

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%',color: "var(--clr-accent)" }}>

                <FollowedButton onClick={() => toggleFollowed(artist)}>
        {isFollowed(artist.id) ? <AiOutlineStar style={{ color: "var(--clr-accent)" , height: "30px",
    width: "30px" }} /> : <AiFillStar/>}
      </FollowedButton>

            </div>
        </Card>
    );


}
