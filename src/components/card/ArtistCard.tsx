import { useNavigate } from "react-router-dom";
import {
  ArtistCardProps,
  Card,
  CardImage,
  CardDescription,
  SongName,
} from "./card.styled.components";

export function ArtistCard({ artist }: Partial<ArtistCardProps>) {
  const navigate = useNavigate();
  const handleArtistClick = (artistId: string) => {
    navigate(`/artist/${artistId}`);
  };

  if (!artist) {
    return null;
  }

  return (
    <Card onClick={() => handleArtistClick(artist.id)}>
      <CardImage
        className="card-img"
        src={artist.thumbnail}
        alt={artist.name}
      />
      <CardDescription>
        <SongName>{artist.name}</SongName>
      </CardDescription>
    </Card>
  );
}
