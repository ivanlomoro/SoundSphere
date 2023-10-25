import { AiFillHeart, AiOutlineHeart, AiOutlinePlayCircle } from 'react-icons/ai';
import {  Card, CardImage, CardDescription, SongName, SongArtist, FavoriteButton } from "./SongCard";
import { Button } from '../button/Button';
import { NavIcon } from '../NavBar/NavBar';
import { SongCardProps } from './SongCard';



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
            <CardDescription>
                <SongName>{song.name}</SongName>
                <SongArtist>{song.artist}</SongArtist>
            </CardDescription>
          

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%',color: "var(--clr-accent)" }}>
            <Button
                        variant="StyledButtonNav"
                        content={<NavIcon icon={AiOutlinePlayCircle} />}
                        ariaLabel="Music Player"
                        onClick={() => addToRecents(song)}
                    />
                <FavoriteButton onClick={() => toggleFavorite(song)}>
        {isFavorite(song.id) ? <AiFillHeart style={{ color: "var(--clr-accent)" , height: "30px",
    width: "30px" }} /> : <AiOutlineHeart  style={{ hover: "var(--clr-accent)" , height: "30px",
    width: "30px" }} />}
      </FavoriteButton>

            </div>
        </Card>
    );
}
