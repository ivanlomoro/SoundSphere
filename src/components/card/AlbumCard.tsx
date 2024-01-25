
import { Album } from '../../pages/AddMusicPage';
import {  Card, CardImage, CardDescription, SongName,  } from './card.styled.components';

interface AlbumCardProps {
    album: Album;
}


export function AlbumCard({ album }: AlbumCardProps) {


    if (!album) {
        return null;
    }


    return (
        <Card>
            <CardImage className="card-img" src={album.thumbnail} alt={album.name} />
            <CardDescription>
                <SongName>{album.name}</SongName>
                {
                    album.artist && (
                        <p>{album.artist.name}</p>)
                  
                }
           
          
            </CardDescription>

        </Card>
    );
}
