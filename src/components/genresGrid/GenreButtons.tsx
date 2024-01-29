import { genres } from "../../interfaces/uploadTypes";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { Songs } from "../../Types/SongsTypes";
import { ScrollableRowComponent } from "../homeContainers/ScrollableRow";
import { useRenderer } from "../../hooks/useRenderer";
useRenderer;

const LinkButton = styled.div`
  background-color: #232323;
  color: white;
  border-radius: 0.6rem;
  font-size: 1em;
  display: flex;
  justify-content: center;
  margin: 1em;
  padding-inline: var(--space-sm);
  width: 10rem;
`;

function GenreButtons() {
  const [songByGenre, setSongByGenre] = useState<Songs[]>([]);
  const { renderSongs: renderGenreSongs } = useRenderer({
    songs: songByGenre,
    layout: "card",
  });

  const fetchSongsByGenre = async (id: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}song/public/genre/${id}`
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
