import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Songs } from "../Types/SongsTypes";
import { useRenderer } from "../hooks/useRenderer";
import { HeaderSection } from "../components";
// import { GenreContext, useGenres } from "../context/genreContext/genreContext";
const GenrePage = (genreId: string) => {
  const [songByGenre, setSongByGenre] = useState<Songs[]>([]);
  const { genreId } = useParams();
  const { toggleFavorite, isFavorite, addToRecents } = useInteractions();
  const { renderSongs: renderGenreSongs } = useRenderer({
    songs: songByGenre,
    layout: "card",
  });

  // const fetchSongsByGenre = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8080/song/public/genre/${genreId}`
  //     );
  //     setSongByGenre(response.data);
  //   } catch (error) {
  //     console.error("Failed to fetch Songs:", error);
  //   }
  // };

  return (
    <>
      <HeaderSection />
      {renderGenreSongs()}
    </>
  );
};
export default GenrePage;
