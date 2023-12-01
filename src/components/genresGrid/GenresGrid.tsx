import { styled } from "styled-components";
import GenreItem from "./GenreItem";


const Cage = styled.div`
  width: 100%;
  height: 5em;
  padding: 16px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size:1.5em;
  

`;	

const GridContainer = styled.div`
margin-top: 1emn;
display: grid;
grid-template-columns: repeat(2, 1fr);
  column-gap: 5em;
  row-gap: 3em;
max-width: 300px;
margin-left: 1.5em;
`;

const GenresGrid = () => {
  return (
    <>
    <GridContainer>
    <Cage>Rock </Cage>
    <Cage>Pop </Cage>
    <Cage>Hip Hop </Cage>
    <Cage>Jazz </Cage>
    <Cage>Classical </Cage>
    <Cage>Electronica </Cage>
    </GridContainer>
    </>
  )
};
export default GenresGrid;
