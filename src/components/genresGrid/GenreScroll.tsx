import React from "react";
import axios from "axios";

function GenreScroll(genreId: string) {
  const fetchSongsByGenre = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/song/public/genre/${genreId}`
      );
      setSongByGenre(response.data);
    } catch (error) {
      console.error("Failed to fetch Songs:", error);
    }
  };
  const { renderSongs: renderGenreSongs } = useRenderer({
    songs: songByGenre,
    layout: "card",
  });

  return <div>GenreScroll</div>;
}

export default GenreScroll;
