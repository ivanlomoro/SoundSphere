// import React, { useReducer } from "react";
// import { SongCardProps, Card , CardImage, CardDescription, SongName, ListCard, ListCardImage, ListCardDescription, ListSongName, Grid, GridItem, GridCard, GridCardImage, GridCardDescription, StyledButtonPlay, FavoriteButton } from '../components/card/CardComponents';
// import { AiOutlinePlayCircle, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
// import { useSongs } from "../context/songContext/songContext";

// type RenderMethod = "list" | "grid" | "card";
// type Songs = {
//   id: number;
//   name: string;
//   artist: string;
//   url: string;
//   thumbnail: string;
//   genre: string;
//   liked: boolean;
// };

// interface Action {
//   type: RenderMethod;
//   songs: Songs[];
// }

// interface RenderState {
//   renderMethod: RenderMethod;
//   songs: Songs[];
// }

// const initialState: RenderState = {
//   renderMethod: "card",
//   songs: [],
// };

// function renderReducer(state: RenderState, action: Action): RenderState {
//   return {
//     ...state,
//     renderMethod: action.type,
//     songs: action.songs,
//   };
// }

// export const useMagic = (songs: Songs[], toggleFavorite: (song: Songs) => void, isFavorite: (id: number) => boolean, addToRecents: (song: Songs) => void) => {
//   const [state, dispatch] = useReducer(renderReducer, initialState);

//   const CardComponent: React.FC<SongCardProps> = ({ song }) => (
//     <Card>
//       <CardImage src={song.thumbnail} alt={song.name} />
//       <CardDescription>
//         <SongName>{song.name}</SongName>
//         <StyledButtonPlay onClick={() => addToRecents(song)}>
//           <AiOutlinePlayCircle />
//         </StyledButtonPlay>
//         <FavoriteButton onClick={() => toggleFavorite(song)}>
//           {isFavorite(song.id) ? <AiFillHeart /> : <AiOutlineHeart />}
//         </FavoriteButton>
//       </CardDescription>
//     </Card>
//   );

//   const ListComponent: React.FC<SongCardProps> = ({ song }) => (
//     <ListCard>
//       <ListCardImage src={song.thumbnail} alt={song.name} />
//       <ListCardDescription>
//         <ListSongName>{song.name}</ListSongName>
//         <StyledButtonPlay onClick={() => addToRecents(song)}>
//           <AiOutlinePlayCircle />
//         </StyledButtonPlay>
//         <FavoriteButton onClick={() => toggleFavorite(song)}>
//           {isFavorite(song.id) ? <AiFillHeart /> : <AiOutlineHeart />}
//         </FavoriteButton>
//       </ListCardDescription>
//     </ListCard>
//   );

//   const GridComponent: React.FC<SongCardProps> = ({ song }) => (
//     <GridItem>
//       <GridCard>
//         <GridCardImage src={song.thumbnail} alt={song.name} />
//         <GridCardDescription>
//           <SongName>{song.name}</SongName>
//           <StyledButtonPlay onClick={() => addToRecents(song)}>
//             <AiOutlinePlayCircle />
//           </StyledButtonPlay>
//           <FavoriteButton onClick={() => toggleFavorite(song)}>
//             {isFavorite(song.id) ? <AiFillHeart /> : <AiOutlineHeart />}
//           </FavoriteButton>
//         </GridCardDescription>
//       </GridCard>
//     </GridItem>
//   );

//   useEffect(() => {
//     dispatch({ type: state.renderMethod, songs });
//   }, [songs, recents, favorites]);

//   const renderSongs = () => {
//     switch (state.renderMethod) {
//       case "list":
//         return songs.map((song) => (
//           <ListComponent
//             key={song.id}
//             song={song}
//             toggleFavorite={toggleFavorite}
//             isFavorite={isFavorite}
//             addToRecents={addToRecents}
//           />
//         ));

//       case "grid":
//         const recentFour = recents.slice(0, 4);
//         return (
//           <Grid>
//             {recentFour.map((song:Songs) => (
//               <GridComponent
//                 key={song.id}
//                 song={song}
//                 toggleFavorite={toggleFavorite}
//                 isFavorite={isFavorite}
//                 addToRecents={addToRecents}
//               />
//             ))}
//           </Grid>
//         );

//       case "card":
//       default:
//         return songs.map((song) => (
//           <CardComponent
//             key={song.id}
//             song={song}
//             toggleFavorite={toggleFavorite}
//             isFavorite={isFavorite}
//             addToRecents={addToRecents}
//           />
//         ));
//     }
//   };

//   return { renderSongs, dispatch };
// };

