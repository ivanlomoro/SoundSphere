import { HeaderSection } from "../components";
import { SearchBar } from "../components/SearchBar/SearchBar";
import GenresGrid from "../components/genresGrid/GenresGrid";
import { styled } from "styled-components";


const Styledh3 = styled.h3`

  font-size: 1.5em;
  margin-left: 2vh;
`;



export const SearchPage = () => {
  return (
    <>
      <HeaderSection text="Search" />
      <SearchBar />
      <Styledh3>Your songs genres</Styledh3>
      <GenresGrid />
    </>
  );
};
