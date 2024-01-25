import { genres } from "../../interfaces/uploadTypes";
import styled from "styled-components";
import { ScrollableRowComponent } from "..";
import axios from "axios";
import { useState } from "react";
import { Songs } from "../../Types/SongsTypes";

import { useRenderer } from "../../hooks/useRenderer";
useRenderer;

const LinkButton = styled.div`
  background-color: #232323;
  color: white;
  border-radius: 0.6rem;
  font-size: 1em;
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 1em;
  
`;
// const genres = [
//   { id: "65b1b95fe5f3c6d344bf0a3c", name: "Rock" },
//   { id: "65b1b99ae5f3c6d344bf0a3e", name: "Pop" },
//   { id: "65b1b9ebe5f3c6d344bf0a40", name: "Hip-Hop" }

//http://localhost:8080/song/public/genre/65b1b95fe5f3c6d344bf0a3c
//http://localhost:8080/song/public/genre/65b1b99ae5f3c6d344bf0a3e
// ];
// http://localhost:8080/song/public/genre/65b1b9ebe5f3c6d344bf0a40

function GenreButtons() {
  const [songByGenre, setSongByGenre] = useState<Songs[]>([]);
  const { renderSongs: renderGenreSongs } = useRenderer({
    songs: songByGenre,
    layout: "card",
  });
  const fetchSongsByGenre = async ( id : string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/song/public/genre/${id}`

      );
      setSongByGenre(response.data);
      return songByGenre;
    } catch (error) {
      console.error("Failed to fetch Songs:", error);
    }
  };

  return (
    <>
      <ScrollableRowComponent>
        {genres.map((genre) => {
          //   const color = predefinedColors[index % predefinedColors.length];

          return (
            <LinkButton
              onClick={() => fetchSongsByGenre(genre.id)}
              key={genre.id}
            >
              <p>{genre.name}</p>{" "}
            </LinkButton>
          );
        })}
      </ScrollableRowComponent>
      <ScrollableRowComponent>{renderGenreSongs()}</ScrollableRowComponent>
    </>
  );
}

export default GenreButtons;
