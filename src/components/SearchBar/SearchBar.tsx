import { ChangeEvent, useContext } from "react";
import { BiSearch } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import { Songs } from "../../Types/SongsTypes";
import styled from "styled-components";
import "./styles.css";
import { useApiCalls } from "../../context/songContext/ApiCalls";
import { PlayerContext } from "../../context/playerContext/playerContext";

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { publicSongs } = useApiCalls();
  const { setCurrentSong, setCurrentList, setPlaying } =
    useContext(PlayerContext);

  const StyledDivSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    background: var(--clr-bg-primary);
    max-width: 100%;
    margin: 10px;
    font-size: 1rem;
  `;

  const StyledDivSection2 = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 2em;
    align-items: center;
    width: 100%;
    margin: 1px;
  `;

  const handleQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ q: e.target.value });
  };

  const query = searchParams.get("q") ?? "";

  return (
    <div className="search">
      <div className="input__container">
        <input
          className="search__input"
          type="search"
          placeholder="Enter song name..."
          value={query}
          onChange={handleQuery}
        />
        <BiSearch className="search__icon" />

        {query && (
          <StyledDivSection className="search__results__container">
            {publicSongs
              .filter((song: Songs) => {
                return (
                  song && song.name.toLowerCase().includes(query.toLowerCase())
                );
              })
              .map((song: Songs, index) => (
                <StyledDivSection2
                  key={index}
                  onClick={() => {
                    setCurrentSong(song);
                    setCurrentList(publicSongs);
                    setPlaying(true);
                  }}
                >
                  <img
                    style={{ width: 50 }}
                    src={song.thumbnail}
                    alt="miscojones"
                  />
                  <StyledDivSection>
                    <p>{song.name}</p>
                    {song.Artist && <p>{song.Artist.name}</p>}
                  </StyledDivSection>
                </StyledDivSection2>
              ))}
          </StyledDivSection>
        )}
      </div>
    </div>
  );
};
