/* eslint-disable react/react-in-jsx-scope */

import { Button } from "..";
import { NavIcon } from "../NavBar/NavBar";
import { Link } from "react-router-dom";
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
  PlayButton,
  FaveButton,
  Minus,
  Plus,

} from "./card.styled.components";
import { AiOutlinePlayCircle } from "react-icons/ai";
import CardContainerButtons from "./CardContainerButtons";
import { SongCardProps } from "../../Types/SongsTypes";
import { useInteractions } from "../../context/userContext/InteractionContext";
import { useLocation } from "react-router-dom";
import { MYSONGSPAGE } from "../../routes/paths";

export function SongCard({ song, variant = "card" }: SongCardProps) {
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
  const {
    toggleFavorite,
    isFavorite,
    addToRecents,
    toggleSelected,
    isSelected,
  } = useInteractions();

  return (
    <CardComponent>
      {variant === "grid" && (
        <Link to={`/displaypage/${song.name}`}>
          <GridImageContainer>
            <ImageComponent src={song.thumbnail} alt={song.name} />
            <PlayButton
              onClick={() => {
                addToRecents(song);
              }}
            />
          </GridImageContainer>
        </Link>
      )}

      {variant != "grid" && (
        <ImageComponent src={song.thumbnail} alt={song.name} />
      )}

      <DescriptionComponent>
        <div>
          <SongName>{song.name}</SongName>
          <SongArtist>{song.artist}</SongArtist>
        </div>
        {variant != "grid" && (
          <CommonButtonContainer>
            <Link to={`/displaypage/${song.name}`}>
              <Button
                variant="StyledButtonNav"
                content={<NavIcon icon={AiOutlinePlayCircle} />}
                ariaLabel="Music Player"
                onClick={() => {
                  addToRecents(song);
                }}
              />{" "}
            </Link>

            <FaveButton
              onClick={() => {
                toggleFavorite(song);
              }}
            >
              {isFavorite(song.id) ? <FullHeart /> : <EmptyHeart />}
            </FaveButton>
            {/* <Button content="Add To Playlist" onClick={() => addToSelected(song)} /> */}
            {/* <FavoriteButton onClick={() => { toggleFavorite(song) }}>
						{isFavorite(song.id) ? <FullHeart /> : <EmptyHeart />}
					</FavoriteButton>  */}
            <FaveButton
              onClick={() => {
                toggleSelected(song);
              }}
            >
              {isSelected(song.id) ? <Minus /> : <Plus />}
            </FaveButton>
          </CommonButtonContainer>
        )}
      </DescriptionComponent>
      {location.pathname === MYSONGSPAGE && (
        <CardContainerButtons song={song} />
      )}
    </CardComponent>
  );
}
