import { FC } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { GenreType } from '../../Types/GenreTypes';


const Cage = styled.div`

  height: 5em;
  padding: 13px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size:1.5em;
  
`;	

type genreCageProps = {
  genre:  GenreType,
  color: string,
  
}


const GenreCage : FC<genreCageProps> = ({genre, color}) => {
    return(
      <>
        <Link to={`/genre/${genre.id}`}>
          <Cage style={{ backgroundColor: color }}>{genre.name} </Cage>
        </Link>
      </>
    )
  };
  export default GenreCage;
  