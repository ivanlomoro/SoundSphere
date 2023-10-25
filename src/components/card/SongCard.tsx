import { Link } from "react-router-dom";
import styled from "styled-components";


export const Card = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    background-color: #282828;
    color: white;
    border-radius: 10px;
    width: 20vh;
    min-width: 20vh;
    margin: 10px;
`;

export const CardImage = styled.img`
    width: 100%;
    border-radius: 8px;
`;

export const CardDescription = styled.div`
   width: 100%;
   padding: 0.4rem;
 
`;
export const SongName = styled.h3`

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`
export const SongArtist = styled.p`
white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  Color: #aaaaaa;
  font-size: 12px;
  margin: 0;
`
export const FavoriteButton = styled.button`
    background: transparent;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    margin-top: 5px;
`;

export const StyledButtonPlay = styled.button`
    background: #1DB954;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 16px;
    margin-top: 5px;
    cursor: pointer;
`;
type Songs = {
    id: number;
    name: string;
    artist: string;
    url: string;
    thumbnail: string;
    genre: string;
    liked: boolean;
}
export type SongCardProps = {
    song: Songs;
    toggleFavorite: (song: Songs) => void;
    isFavorite: (id: number) => boolean;
    addToRecents: (song: Songs) => void;
}



export function SongCard({ song, toggleFavorite, isFavorite, addToRecents }: Partial<SongCardProps>) {
    console.log('init-song-card')
    // La mierda esa del undefined la he resuelto con partial y esto, pero no estoy seguro
    if (!song) {
        return null;  
    }
    if (!toggleFavorite || !isFavorite || !addToRecents) {
        return null;
    }
  
    return (
        <Card>
            <CardImage className="card-img" src={song.thumbnail} alt={song.name} />
            <CardDescription>                
                    <SongName>{song.name}</SongName>
                    <SongArtist>{song.artist}</SongArtist>             
            </CardDescription>
            
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <Link to={`/displaypage/${song.name}`}>
                <StyledButtonPlay onClick={() => addToRecents(song)}>Play</StyledButtonPlay>
            </Link>
            <FavoriteButton onClick={() => toggleFavorite(song)}>
                {isFavorite(song.id) ? "❤️" : "♡"}
            </FavoriteButton>       
                
                 </div>
        </Card>
    );
}