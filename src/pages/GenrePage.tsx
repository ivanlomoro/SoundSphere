import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Songs } from "../Types/SongsTypes";
import { useRenderer } from "../hooks/useRenderer";
import { useInteractions } from "../context/userContext/InteractionContext";
import { HeaderSection } from "../components";
const GenrePage = () => {
  const [songByGenre, setSongByGenre] = useState<Songs[]>([]);
  const { genreId } = useParams();

  const { toggleFavorite, isFavorite, addToRecents } = useInteractions();

  const { renderSongs: renderGenreSongs } = useRenderer({
    songs: songByGenre,
    toggleFavorite,
    isFavorite,
    addToRecents,
    layout: "list",
  });

  useEffect(() => {
    const fetchSongsByGenre = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/song/public/genre/${genreId}`
        );
        setSongByGenre(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch Songs:", error);
      }
    };
    fetchSongsByGenre();
  }, []);

  return <>
   <HeaderSection text=" " />
  {renderGenreSongs()}</>;
};
export default GenrePage;
