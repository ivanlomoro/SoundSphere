import styled from 'styled-components'
import { type Artist } from '../../Types/SongsTypes'
import { AiFillHeart, AiOutlineHeart, AiOutlinePlayCircle } from 'react-icons/ai'

// export const CommonButtonContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   width: 100%;
// `;
// // Card Styles
// export const Card = styled.li`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   background-color: #282828;
//   color: white;
//   border-radius: 10px;
//   padding: 15px;
//   width: 10rem;
//   min-width: 10rem;
//   margin: 10px;
// `;
// export const CardImage = styled.img`
//   width: 100%;
//   border-radius: 8px;
// `;
// export const CardDescription = styled.div`
//   width: 100%;
//   padding: 0.4rem;
// `;
// // List Styles
// export const ListCard = styled(Card)`
// width: 85%;
// display: flex;
// flex-direction: row;
// align-items: center;
// background-color: #6a6a6a;
// color: white;
// border-radius: 10px;
// user-select: none;
// margin: 10px;
// `;
// export const ListCardImage = styled(CardImage)`
//   width: 25%;
// `;
// export const ListCardDescription = styled(CardDescription)`
//   padding: 0.4rem;
//   position: relative;
//   width: 75vw;
//   height: 25vw;
//   font-size: 1.5rem;
// `;
// // Grid Styles
// export const GridCard = styled(Card)`

//   height: 15vw;
//   flex-direction: row;
//   background-color: #6a6a6a;
//   margin: 10px;
// `;
// export const GridCardImage = styled(CardImage)`
//   width: 15vw;
// `;
// export const GridCardDescription = styled(CardDescription)`
//   padding: 0.4rem;
//   position: relative;
//   width: 25vw;
//   height: 15vw;
// `;
// // Common Song Info Styles
// export const SongName = styled.h3`
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   margin: 0;
// `;
// export const SongArtist = styled.p`
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   color: #aaaaaa;
//   font-size: 12px;
//   margin: 0;
// `;
// // Action Button
// export const FavoriteButton = styled.button`
//   background: transparent;
//   border: none;
//   color: white;
//   font-size: 2.8em;
//   cursor: pointer;
//   margin-top: 5px;
// `;
// export const FollowedButton = styled.button`
//     background: transparent;
//     border: none;
//     color: white;
//     font-size: 24px;
//     cursor: pointer;
//     margin-top: 5px;
// `;

// export const StyledButtonPlay = styled.button`
//     background: #1DB954;
//     color: white;
//     border: none;
//     border-radius: 20px;
//     padding: 10px 20px;
//     font-size: 16px;
//     margin-top: 5px;
//     cursor: pointer;
// `;

export interface ArtistCardProps {
  artist: Artist
  toggleFollowed: (artist: Artist) => void
  isFollowed: (id: number) => boolean
}

// Common Button Container
export const CommonButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--w-full);
`

// Card Styles
export const Card = styled.li`
  display: flex; 
   align-items: center;
  flex-direction: column;
  font-size:clamp(0.8rem, 1.5rem, 2rem);
  background-color: var(--clr-bg-elements);
  color: var(--clr-text-secondary);
  border-radius: var(--radius-sm);
  padding: var(--space-md);
  width: 10rem;
  min-width: 10rem;
  margin: var(--space-md);
`

export const CardImage = styled.img`
  width: var(--w-full);
  border-radius: var(--radius-sm);
`

export const CardDescription = styled.div`
  width: var(--w-full);
  padding: var(--space-xs);
`

// List Styles
export const ListCard = styled(Card)`
  width: 85%;
  flex-direction: row;
  align-items: center;
  background-color: var(--clr-bg-tertiary);
  margin: var(--space-md)
  ;
`
export const PlayButton = styled(AiOutlinePlayCircle)`
  height: 50px;
  width: 50px;
  position: absolute;
  left: 0;
 opacity : 0.2;
 &:hover{
    opacity: 1;
   }

  
`



export const ListCardImage = styled(CardImage)`
  height: auto;
  width: auto;
  position: relative;
  
`

export const ListCardDescription = styled(CardDescription)`
  padding: var(--space-xs);
  position: relative;
  width: 75vw;
  height: 25vw;
  
`


export const GridCard = styled.li`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  background-color: var(--clr-bg-elements);
  color: var(--clr-text-secondary);
  border-radius: var(--radius-sm);
  min-width: 95%;
  font-size:clamp(1rem, 1.3rem, 1.5rem);
  margin: var(--space-xs);
  align-items: center;
`


export const GridImageContainer= styled.div`
position: relative;

`

export const GridCardImage = styled.img`
  grid-column: 1;
  grid-row: 1/span 2;
  height: 50px;
  width: 50px;
  border-radius: var(--radius-sm);
`

export const GridCardDescription = styled.div`
  grid-column: 2;
 grid-row: 1/span 2;
  display: flex;  
  overflow: hidden;
   text-overflow: ellipsis;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--space-xs);

  
`

// Common Song Info Styles
export const SongName = styled.h3`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
   color: var(--clr-text-primary);
`

export const SongArtist = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: clamp(0.5rem, 10vw, 1rem);
  color: var(--clr-text-secondary);
  margin: 0;
`

// Action Buttons
export const FavoriteButton = styled.button`
  background: transparent;
  border: none;
  color: var(--clr-text-secondary);
  font-size: var(--fs-lg)
  cursor: pointer;
  &:hover{
    color: var(--clr-accent);
   }
  ;
`
export const FullHeart = styled(AiFillHeart)`
color: var(--clr-accent);
width: 30px;
height: 30px`
export const EmptyHeart = styled(AiOutlineHeart)`
width: 30px;
height: 30px`

export const FaveButton = styled.button`
background: transparent;
border: none;
color: var(--clr-text-secondary);
&: hover {
  color : var(--clr-accent);
}
`

export const FollowedButton = styled.button`
  background: transparent;
  border: none;
  color: var(--clr-text-secondary);
  font-size: 24px;
  cursor: pointer;
  margin-top: var(--space-sm);
   &:hover{
    color: var(--clr-accent);
   }
`

export const ArtistActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--clr-accent);
`
