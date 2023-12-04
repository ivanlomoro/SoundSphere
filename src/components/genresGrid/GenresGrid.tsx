import { styled } from "styled-components";
import { genres } from "../../interfaces/uploadTypes";
import GenreCage from "./GenreCage";

const predefinedColors = ["#FF5733", "#33FF57", "#5733FF", "#FF33A1", "#33A1FF"];

const GridContainer = styled.div`
  margin-top: 1em;
  display: grid;
  grid-template-columns: repeat(2, 1fr); // Set to two equal columns
  column-gap: 3em;
  row-gap: 3em;
  max-width: 200px;
  margin-left: 1em;
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