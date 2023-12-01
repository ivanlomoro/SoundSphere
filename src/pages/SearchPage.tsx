import { HeaderSection } from "../components";
import { SearchBar } from "../components/SearchBar/SearchBar";
import GenresGrid from "../components/genresGrid/GenresGrid";

export const SearchPage = () => {
  return (
    <>
      <HeaderSection text="Search" />
      <SearchBar />
      <h3>Your songs genres</h3>
      <GenresGrid />
    </>
  );
};
