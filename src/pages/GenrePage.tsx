import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Songs } from "../Types/SongsTypes";
import { useRenderer } from "../hooks/useRenderer";
import { HeaderSection } from "../components/header/Header";
const GenrePage = () => {
  const [songByGenre, setSongByGenre] = useState<Songs[]>([]);
  const { genreId } = useParams();

  const { renderSongs: renderGenreSongs } = useRenderer({
    songs: songByGenre,
    layout: "list",
  });

  useEffect(() => {
    const fetchSongsByGenre = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}song/public/genre/${genreId}`
        );
        setSongByGenre(response.data);
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
