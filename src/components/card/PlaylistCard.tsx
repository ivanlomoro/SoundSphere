import { useNavigate } from "react-router-dom";

import {
  Card,
  CardImage,
  CardDescription,
  SongName,
  GridCardDescription,
  GridCardImage,
  GridCard,
  FullScreenCardTitle,
  ListCard,
  ListCardImage,
  ListCardDescription,
} from "./card.styled.components";
import PlaylistActionButtons from "./PlaylistActionButtons";

interface PlaylistCardProps {
  playlist: PlaylistType;
  variant?: "grid" | "list" | "card" | "fullscreen";
}

export function PlaylistCard({
  playlist,
  variant = "card",
}: PlaylistCardProps) {
  const navigate = useNavigate();

  if (!playlist) return null;

  const CardComponent =
    variant === "grid" ? GridCard : variant === "list" ? ListCard : Card;
  const ImageComponent =
    variant === "grid"
      ? GridCardImage
      : variant === "list"
      ? ListCardImage
      : CardImage;
  const DescriptionComponent =
    variant === "grid"
      ? GridCardDescription
      : variant === "list"
      ? ListCardDescription
      : CardDescription;

  const handleCardClick = () => {
    navigate(`/playlist/${playlist.playlistName}`);
  };

  return (
    <CardComponent onClick={handleCardClick}>
      {variant === "fullscreen" && (
        <>
          <FullScreenCardTitle>
            {playlist.playlistName}
            <span>{playlist.playlistSongs.length} songs</span>
          </FullScreenCardTitle>
          <PlaylistActionButtons />
        </>
      )}

      <ImageComponent src={playlist.image} alt={playlist.playlistName} />

      {variant === "list" && (
        <>
          {" "}
          <DescriptionComponent>
            <SongName>{playlist.playlistName}</SongName>
            <PlaylistActionButtons />
          </DescriptionComponent>
        </>
      )}
    </CardComponent>
  );
}
