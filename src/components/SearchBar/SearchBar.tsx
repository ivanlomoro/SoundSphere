import { ChangeEvent, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Link, useSearchParams } from "react-router-dom";
import db from "../../data/db.json";
import { Songs } from "../../Types/SongsTypes";
import styled from "styled-components";
import "./styles.css";
import { useApiCalls } from "../../context/songContext/ApiCalls";

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { publicSongs } = useApiCalls();

  const StyledDivSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    max-width: 100%;
    margin: 10px;
  `;

  const StyledDivSection2 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 10px;
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
              .map((song: Songs) => (
                <Link key={song.id} to={`/displaypage/${song.name}`}>
                  <StyledDivSection2>
                    <img
                      style={{ width: 50 }}
                      src={song.thumbnail}
                      alt="miscojones"
                    />
                    <StyledDivSection>
                      <p>{song.name}</p>
                      <p>{song.artist}</p>
                    </StyledDivSection>
                  </StyledDivSection2>
                </Link>
              ))}
          </StyledDivSection>
        )}
      </div>
    </div>
  );
};
