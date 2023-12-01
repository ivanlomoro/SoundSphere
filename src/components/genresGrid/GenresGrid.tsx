import { styled } from "styled-components";
import { genres } from "../../interfaces/uploadTypes";
import GenreCage from "./GenreCage";


const GridContainer = styled.div`
margin-top: 1emn;
display: grid;
grid-template-columns: repeat(2);
  column-gap: 5em;
  row-gap: 3em;
max-width: 300px;
margin-left: 1.5em;
`;

const GenresGrid = () => {
  return (
    <>
    <GridContainer>
      {genres.map(genre => {
        return(
          <GenreCage key= {genre.id} genre= {genre} />
        )
      })}
    </GridContainer>
    </>
  )
};
export default GenresGrid;
