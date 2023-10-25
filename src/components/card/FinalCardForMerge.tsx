import { AiFillHeart, AiOutlineHeart, AiOutlinePlayCircle } from 'react-icons/ai';
import styled from "styled-components";
import { Button } from '..';
import { NavIcon } from '../NavBar/NavBar';


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
  toggleFavorite?: (song: Songs) => void;
  isFavorite?: (id: number) => boolean;
  addToRecents?: (song: Songs) => void;
  variant?: "grid" | "list" | "card"; 
}



const Card = styled.li`
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

const CardImage = styled.img`
    width: 100%;
    border-radius: 8px;
`;

const CardDescription = styled.div`
   width: 100%;
   padding: 0.4rem;
`;

// const SongName = styled.h3`
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   margin: 0;
// `;


export const ListCardDescription = styled.div`
    padding: 0.4rem;
   position: relative;
   width: 75vw;
   height: 25vw;
 
  `
// const SongArtist = styled.p`
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   color: #aaaaaa;
//   font-size: 12px;
//   margin: 0;
// `;

const FavoriteButton = styled.button`
    background: transparent;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    margin-top: 5px;
`;

// const StyledButtonPlay = styled.button`
//     background: #1DB954;
//     color: white;
//     border: none;
//     border-radius: 20px;
//     padding: 10px 20px;
//     font-size: 16px;
//     margin-top: 5px;
//     cursor: pointer;
// `;

export const ListCardImage = styled.img`
    width: 15vw;
    border-radius: 8px;
`


const GridCard = styled.li`
    width: 45vw;
    height: 15vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #6a6a6a;
    color: white;
    border-radius: 10px;
    margin: 10px;
`;

const GridCardImage = styled.img`
    width: 15vw;
    border-radius: 8px;
`;

const GridCardDescription = styled.div`
    padding: 0.4rem;
    position: relative;
    width: 25vw;
    height: 15vw;
`;
export function SongCard({ song, toggleFavorite, isFavorite, addToRecents, variant = "card" }: SongCardProps) {
  

  const CardComponent = variant === "grid" ? GridCard : variant === "list" ? Card : Card;
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
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button
                        variant="StyledButtonNav"
                        content={<NavIcon icon={AiOutlinePlayCircle} />}
                        ariaLabel="Music Player"
                        onClick={()=> addToRecents(song)}
                    />
                    <div style={{color: "var(--clr-accent)"} as React.CSSProperties}> {/* Define the variable somewhere in your styles */}
      <FavoriteButton onClick={() => toggleFavorite(song)}>
        {isFavorite(song.id) ? <AiFillHeart style={{ color: "var(--clr-accent)" }} /> : <AiOutlineHeart />}
      </FavoriteButton>
    </div>

                </div>
      </DescriptionComponent>
    </CardComponent>
  );
}