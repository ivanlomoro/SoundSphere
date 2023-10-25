
import { AiFillHeart, AiOutlineHeart, AiOutlinePlayCircle } from 'react-icons/ai';
import { CardDescription, RowCard, Card, CardImage } from './CardComponents';
import { GridCard, GridCardDescription, GridCardImage } from './GridCard';
import { ListCardDescription, ListCardImage } from './ListCard';
import { SongCardProps } from './SongCard';

export function SongCard({ song, toggleFavorite, isFavorite, addToRecents, variant }: Partial<SongCardProps>) {
  const CardComponent = variant === "grid" ? GridCard : variant === "list" ? RowCard : Card;
  const ImageComponent = variant === "grid" ? GridCardImage : variant === "list" ? ListCardImage : CardImage;
  const DescriptionComponent = variant === "grid" ? GridCardDescription : variant === "list" ? ListCardDescription : CardDescription;

  if (!song || !toggleFavorite || !isFavorite || !addToRecents) {
    return null;
  }

  return (
    <CardComponent>
      <ImageComponent src={song.thumbnail} alt={song.name} />
      <DescriptionComponent>
        <div>
          <h3>{song.name}</h3>
          <p>{song.artist}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%', color: "var(--clr-accent)" }}>
          <button onClick={() => addToRecents(song)}>
            <AiOutlinePlayCircle />
          </button>
          <button onClick={() => toggleFavorite(song)}>
            {isFavorite(song.id) ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
        </div>
      </DescriptionComponent>
    </CardComponent>
  );
}