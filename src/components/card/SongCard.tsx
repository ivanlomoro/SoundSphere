/* eslint-disable react/react-in-jsx-scope */

import {
  GridCard,
  ListCard,
  Card,
  GridImageContainer,
  GridCardImage,
  ListCardImage,
  CardImage,
  GridCardDescription,
  ListCardDescription,
  CardDescription,
  SongName,
  SongArtist,
  CommonButtonContainer,
  FullHeart,
  EmptyHeart,
  FaveButton,
  Plus,
} from "./card.styled.components";
import CardContainerButtons from "./CardContainerButtons";
import { SongCardProps } from "../../Types/SongsTypes";
import { useInteractions } from "../../context/userContext/InteractionContext";
import { useLocation } from "react-router-dom";
import { MYSONGSPAGE } from "../../routes/paths";
import { useContext } from "react";
import { PlayerContext } from "../../context/playerContext/playerContext";
import { PlaylistContext } from "../../context/playlistContext/PlayListContext";

export function SongCard({ song, variant = "card", songs }: SongCardProps) {
  const location = useLocation();
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
  const { toggleFavorite, isFavorite, addToRecents } = useInteractions();
  const { setSongForPlaylist } = useContext(PlaylistContext);
  const { setCurrentSong, setCurrentList, setPlaying } =
    useContext(PlayerContext);
  if (!songs) {
    return null;
  }

  return (
    <CardComponent>
      {variant === "grid" && (
        <GridImageContainer
          onClick={() => {
            addToRecents(song);
            setCurrentList(songs);
            setCurrentSong(song);
            setPlaying(true);
          }}
        >
          <ImageComponent src={song.thumbnail} alt={song.name} />
        </GridImageContainer>
      )}

      {variant != "grid" && (
        <ImageComponent
          src={song.thumbnail}
          alt={song.name}
          onClick={() => {
            addToRecents(song);
            setCurrentList(songs);
            setCurrentSong(song);
            setPlaying(true);
          }}
        />
      )}

      <DescriptionComponent>
        <div>
          <SongName>{song.name}</SongName>
          {/* <SongArtist>{song.artist}</SongArtist> */}
        </div>
        {/* {variant != "grid" && (
          <CommonButtonContainer>
            <FaveButton
              onClick={() => {
                toggleFavorite(song);
              }}
            >
              {isFavorite(song.id) ? <FullHeart /> : <EmptyHeart />}
            </FaveButton>
            <FaveButton onClick={() => setSongForPlaylist(song)}>
              <Plus />
            </FaveButton>
          </CommonButtonContainer>
        )} */}
      </DescriptionComponent>
      {location.pathname === MYSONGSPAGE && (
        <CardContainerButtons song={song} />
      )}
    </CardComponent>
  );
}
