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
  
}


const GenreCage : FC<genreCageProps> = ({genre}) => {
    return(
      <>
        <Link to={`/genre/${genre.id}`}>
          <Cage>{genre.name} </Cage>
        </Link>
      </>
    )
  };
  export default GenreCage;
  