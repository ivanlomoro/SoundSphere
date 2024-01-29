import styled from "styled-components";
import { type Artist } from "../../Types/SongsTypes";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlinePlayCircle,
} from "react-icons/ai";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

export interface ArtistCardProps {
  artist: Artist;
  toggleFollowed: (artist: Artist) => void;
  isFollowed: (id: string) => boolean;
}

export const FullScreenCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  user-select: none;
  margin: 0;
  width: 100vw;
  z-index: 3;
`;

export const FullScreenCardTitle = styled.h2`
  font-size: 2.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  z-index: 3;
`;

export const FullscreenCardDetails = styled.p`
  color: #aaaaaa;
  font-size: 1.5rem;
  margin: 5px 0;
  text-align: center;
  z-index: 3;
`;

export const CommonButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--w-full);
`;

export const Card = styled.li`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: clamp(0.8rem, 1.5rem, 2rem);
  background-color: var(--clr-bg-elements);
  color: var(--clr-text-secondary);
  border-radius: var(--radius-sm);
  padding: var(--space-md);
  width: 10rem;
  min-width: 10rem;
  margin: var(--space-sm);
`;

export const CardForLibrary = styled(Card)`
  min-width: 80%;
  margin: 0;
  width: 100%;
`;

export const CardPlaylist = styled(CardForLibrary)`
  width: 65%;
  aspect-ratio: 1/1;
`;

export const CardImage = styled.img`
  width: var(--w-full);
  height: 10rem;
  border-radius: var(--radius-sm);
`;

export const CardImagePlaylist = styled(CardImage)`
  aspect-ratio: 1/1;
  height: unset;
`;

export const CardImageArtist = styled.img`
  width: var(--w-full);
  height: 10rem;
  border-radius: var(--radius-xl);
`;

export const CardDescription = styled.div`
  width: var(--w-full);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: var(--fs-lg);
`;

export const ListCard = styled(Card)`
  width: 85%;
  max-height: 10vh;
  flex-direction: row;
  align-items: center;
  margin: var(--space-md);
`;

export const PlayButton = styled(AiOutlinePlayCircle)`
  height: 50px;
  width: 50px;
  position: absolute;
  left: 0;
  opacity: 0.2;
  &:hover {
    opacity: 1;
  }
`;

export const FullScreenImage = styled(CardImage)``;
export const ListCardImage = styled(CardImage)`
  max-height: 12vh;
  max-width: 12vh;
  position: relative;
`;

export const ListCardDescription = styled(CardDescription)`
  padding: var(--space-md);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: clamp(0.5rem, 10vw, 1rem);
  overflow: hidden;
  text-align: center;
  gap: var(--space-xl);
`;

export const GridCard = styled.li`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  background-color: var(--clr-bg-elements);
  color: var(--clr-text-secondary);
  border-radius: var(--radius-sm);
  min-width: 95%;
  font-size: 1.2em;
  margin: var(--space-xs);
  align-items: center;
`;

export const GridImageContainer = styled.div`
  position: relative;
`;

export const GridCardImage = styled.img`
  grid-column: 1;
  grid-row: 1 / span 2;
  height: 60px;
  width: 60px;
  border-radius: var(--radius-sm);
`;

export const GridCardDescription = styled.div`
  grid-column: 2;
  grid-row: 1 / span 2;
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--space-xs);
`;

export const SongName = styled.h5`
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  font-weight: 400;
  color: var(--clr-text-primary);
  min-height: 50px;
  display: flex;
  align-items: center;
`;

export const GridSongName = styled.h5`
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  color: var(--clr-text-primary);
  min-height: unset;
`;

export const SongArtist = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: clamp(0.5rem, 10vw, 1rem);
  color: var(--clr-text-secondary);
  margin: 0;
`;

export const FavoriteButton = styled.button`
  background: transparent;
  border: none;
  color: var(--clr-text-secondary);
  font-size: var(--fs-lg);
  cursor: pointer;
  &:hover {
    color: var(--clr-accent);
  }
`;
export const FullHeart = styled(AiFillHeart)`
  color: var(--clr-accent);
  width: 30px;
  height: 30px;
`;

export const FullMiniHeart = styled(AiFillHeart)`
  color: var(--clr-bg-primary);
  width: 30px;
  height: 30px;
`;

export const EmptyHeart = styled(AiOutlineHeart)`
  width: 30px;
  height: 30px;
`;

export const Plus = styled(CiCirclePlus)`
  width: 30px;
  height: 30px;
  stroke-width: 0.75px;
`;

export const Minus = styled(CiCircleMinus)`
  width: 30px;
  color: var(--clr-accent);
  height: 30px;
`;

export const FaveButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  color: var(--clr-text-secondary);
  &:hover {
    color: var(--clr-accent);
  }
`;

export const MiniFaveButton = styled.button`
  background: transparent;
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  color: var(--clr-bg-primary);
  &:hover {
    color: var(--clr-bg-primary);
  }
  cursor: pointer;
`;

export const StyledColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PlayListButton = styled.button`
  background: transparent;
  border: none;
  color: var(--clr-text-secondary);
  &:hover {
    color: var(--clr-accent);
  }
`;

export const FollowedButton = styled.button`
  background: transparent;
  border: none;
  color: var(--clr-text-secondary);
  font-size: 24px;
  cursor: pointer;
  margin-top: var(--space-sm);
  &:hover {
    color: var(--clr-accent);
  }
`;

export const ArtistActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--clr-accent);
`;
