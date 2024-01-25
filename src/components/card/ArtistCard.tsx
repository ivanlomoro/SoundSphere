
import { ArtistCardProps, Card, CardImage, CardDescription, SongName } from './card.styled.components';



export function ArtistCard({ artist }: Partial<ArtistCardProps>) {
 
    if (!artist) {
        return null;
    }
   

    return (
        <Card>
            <CardImage className="card-img" src={artist.thumbnail} alt={artist.name} />
            <CardDescription>
                <SongName>{artist.name}</SongName>
                <SongName>Total Songs: {artist.song?.length}</SongName>
            </CardDescription>

        </Card>
    );
}
