import styled from "styled-components";


const Card = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    background-color: #282828;
    color: white;
    border-radius: 10px;
    width: 200px;
    margin: 10px;
`;

const CardImage = styled.img`
    width: 100%;
    border-radius: 8px;
`;

const CardDescription = styled.p`
    font-size: 16px;
    margin-top: 10px;
`;

const FavoriteButton = styled.button`
    background: transparent;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    margin-top: 5px;
`;

const StyledButtonPlay = styled.button`
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
type SongCardProps = {
    song: Songs;
    toggleFavorite: (song: Songs) => void;
    isFavorite: (id: number) => boolean;
    addToRecents: (song: Songs) => void;
}

export function SongCard({ song, toggleFavorite, isFavorite, addToRecents }: Partial<SongCardProps>) {
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
            <CardDescription className="card-description">{song.name} by {song.artist}</CardDescription>
            <FavoriteButton onClick={() => toggleFavorite(song)}>
                {isFavorite(song.id) ? "❤️" : "♡"}
            </FavoriteButton>
            <StyledButtonPlay onClick={() => addToRecents(song)}>Play</StyledButtonPlay>
        </Card>
    );
}