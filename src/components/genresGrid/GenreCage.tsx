import { FC } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Cage = styled.div`
  padding: 13px;
  background-color: #f0f0f0;
  border-radius: 5px;
  font-size: 1.5em;
  aspect-ratio: 2/1;
  @media only screen and (max-width: 400px) {
    font-size: 1em;
  }
`;

type genreCageProps = {
  genre: GenreForCage;
  color: string;
};

type GenreForCage = {
  name: string;
  id: string;
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
