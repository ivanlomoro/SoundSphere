import { FC } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { GenreType } from "../../Types/GenreTypes";

const Cage = styled.div`
  height: 5em;
  padding: 13px;
  background-color: #f0f0f0;
  border-radius: 5px;
  font-size: 1.5em;
  @media only screen and (max-width: 400px) {
    font-size: 1em;
  }
`;

type genreCageProps = {
  genre: GenreType;
  color: string;
};

const Styledh3 = styled.h3`
  font-size: 1.5em;
`;

const GenreCage: FC<genreCageProps> = ({ genre, color }) => {
  return (
    <>
      <Link to={`/genre/${genre.id}`}>
        <Cage style={{ backgroundColor: color }}>
          <Styledh3>{genre.name}</Styledh3>{" "}
        </Cage>
      </Link>
    </>
  );
};

export default GenreCage;
