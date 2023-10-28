import { AiFillHeart, AiOutlineHeart, AiOutlinePlayCircle } from 'react-icons/ai';
import styled from "styled-components";
import { Button } from '..';
import { NavIcon } from '../NavBar/NavBar';
import { Link } from 'react-router-dom';

export type Songs = {
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
  toggleFavorite?: (song: Songs) => void;
  isFavorite?: (id: number) => boolean;
  addToRecents?: (song: Songs) => void;
  variant?: "grid" | "list" | "card"; 
}

// Common Component Styles
const CommonButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

// Card Styles
const Card = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #282828;
  color: white;
  border-radius: 10px;
  padding: 15px;
  width: 20vh;
  min-width: 20vh;
  margin: 10px;
`;

const CardImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const CardDescription = styled.div`
  width: 100%;
  padding: 0.4rem;
`;

// List Styles
const ListCard = styled(Card)`
width: 85%;
display: flex;
flex-direction: row;
align-items: center;
background-color: #6a6a6a;
color: white;
border-radius: 10px;
user-select: none;
margin: 10px;
`;

const ListCardImage = styled(CardImage)`
  width: 25%;
`;

const ListCardDescription = styled(CardDescription)`
  padding: 0.4rem;
  position: relative;
  width: 75vw;
  height: 25vw;
  font-size: 1.5rem;
`;

// Grid Styles
const GridCard = styled(Card)`
  width: 45vw;
  height: 15vw;
  flex-direction: row;
  background-color: #6a6a6a;
  margin: 10px;
`;

const GridCardImage = styled(CardImage)`
  width: 15vw;
`;

const GridCardDescription = styled(CardDescription)`
  padding: 0.4rem;
  position: relative;
  width: 25vw;
  height: 15vw;
`;

// Common Song Info Styles
const SongName = styled.h3`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

const SongArtist = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #aaaaaa;
  font-size: 12px;
  margin: 0;
`;

// Action Button
const FavoriteButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 2.8em;
  cursor: pointer;
  margin-top: 5px;
`;

// Main SongCard Component
export function SongCard({ song, toggleFavorite, isFavorite, addToRecents, variant = "card" }: SongCardProps) {
  const CardComponent = variant === "grid" ? GridCard : variant === "list" ? ListCard : Card;
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
          <SongName>{song.name}</SongName>
          <SongArtist>{song.artist}</SongArtist>
        </div>
        <CommonButtonContainer>
          <Link to={`/displaypage/${song.name}`}>
            <Button
              variant="StyledButtonNav"
              content={<NavIcon icon={AiOutlinePlayCircle} />}
              ariaLabel="Music Player"
              onClick={() => addToRecents(song)}
            />
          </Link>
          <FavoriteButton onClick={() => toggleFavorite(song)}>
            {isFavorite(song.id) ? <AiFillHeart style={{ color: "var(--clr-accent)" }} /> : <AiOutlineHeart />}
          </FavoriteButton>
        </CommonButtonContainer>
      </DescriptionComponent>
    </CardComponent>
  );
}
