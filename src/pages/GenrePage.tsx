import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Songs } from "../Types/SongsTypes";
import { useRenderer } from "../hooks/useRenderer";
import { HeaderSection } from "../components";
import { GenreContext, useGenres } from "../context/genreContext/genreContext";
const GenrePage = () => {
  const [songByGenre, setSongByGenre] = useState<Songs[]>([]);
  const { genreId } = useParams();
  const { apiGenres } = useGenres();

  const genreName = apiGenres.find((genre) => genre.id === genreId);
  console.log("CURRENT GENRE:", genreName);

  const { renderSongs: renderGenreSongs } = useRenderer({
    songs: songByGenre,
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

  return (
    <>
      <HeaderSection />
      {renderGenreSongs()}
    </>
  );
};
export default GenrePage;
