import { styled } from "styled-components";
import { genres } from "../../interfaces/uploadTypes";
import GenreCage from "./GenreCage";

const predefinedColors = [
  "#BA2D0B",
  "#C8963E",
  "#73BA9B",
  "#6E7DAB",
  "#3185FC",
  "#CA1631",
];

const GridContainer = styled.div`
  margin-top: 2em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 3em;
  row-gap: 3em;
  margin-inline: 2em;
`;

const GenresGrid = () => {
  return (
    <>
      <GridContainer>
        {genres.map((genre, index) => {
          const color = predefinedColors[index % predefinedColors.length];

          return <GenreCage key={genre.id} genre={genre} color={color} />;
        })}
      </GridContainer>
    </>
  );
};

export default GenresGrid;
