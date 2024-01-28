import { useNavigate } from "react-router-dom";
import { Album } from "../../pages/AddMusicPage";
import {
  Card,
  CardImage,
  CardDescription,
  SongName,
} from "./card.styled.components";

interface AlbumCardProps {
  album: Album;
}

export function AlbumCard({ album }: AlbumCardProps) {
  const navigate = useNavigate();
  const handleAlbumClick = (albumId: string) => {
    navigate(`/album/${albumId}`);
  };

  if (!album) {
    return null;
  }

  return (
    <Card onClick={() => handleAlbumClick(album.id)}>
      <CardImage className="card-img" src={album.thumbnail} alt={album.name} />
      <CardDescription>
        <SongName>{album.name}</SongName>
        {album.Artist && <p>{album.Artist.name}</p>}
      </CardDescription>
    </Card>
  );
}
