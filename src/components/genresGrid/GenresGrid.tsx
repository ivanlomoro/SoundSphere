import { styled } from "styled-components";
import { genres } from "../../interfaces/uploadTypes";
import GenreCage from "./GenreCage";

const predefinedColors = ["#d3ebc7", "#74bf9d", "#b8c2a0", "#cde9ca", "#c6d7a0"];

const GridContainer = styled.div`
  margin-top: 1em;
  display: grid;
  grid-template-columns: repeat(2, 1fr); // Set to two equal columns
  column-gap: 3em;
  row-gap: 3em;
  max-width: 200px;
  margin-left: 2em;
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