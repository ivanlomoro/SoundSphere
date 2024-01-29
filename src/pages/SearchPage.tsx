import { HeaderSection } from "../components/header/Header";
import { SearchBar } from "../components/SearchBar/SearchBar";
import GenresGrid from "../components/genresGrid/GenresGrid";

export const SearchPage = () => {
  return (
    <>
      <HeaderSection text="Search" />
      <SearchBar />
      <GenresGrid />
    </>
  );
};
