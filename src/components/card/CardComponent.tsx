// import { CardDescription, RowCard } from "./CardComponents";
// import { GridCard, GridCardDescription, GridCardImage } from "./GridCard";
// import { useSongs } from "../../context/songContext/songContext";
// import { Card, CardImage } from "./SongCard";
// import { ListCardDescription, ListCardImage } from "./ListCard";



//   export const SongCard: React.FC<SongCardProps> = ({  variant, toggleFavorite, isFavorite, addToRecents }) => {
//     const {song, thumbnail, name} = useSongs
//     const CardComponent = variant === "grid" ? GridCard : variant === "list" ? RowCard : Card;
//     const ImageComponent = variant === "grid" ? GridCardImage : variant === "list" ? ListCardImage : CardImage;
//     const DescriptionComponent = variant === "grid" ? GridCardDescription : variant === "list" ? ListCardDescription : CardDescription;
  
//     return (
//       <CardComponent>
//         <ImageComponent src={song.thumbnail} alt={song.name} />
//         <DescriptionComponent>
        
//         </DescriptionComponent>
//       </CardComponent>
//     );
//   };