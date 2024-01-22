import { genres } from "../../interfaces/uploadTypes";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ScrollableRowComponent } from "..";

const LinkButton = styled.div`
  background-color: #232323;
  color: white;
  border-radius: 0.6rem;
  font-size: 1em;
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 1em;
  mouse: pointer;
`;

function GenreButtons() {
  return (
    <ScrollableRowComponent>
      {genres.map((genre) => {
        //   const color = predefinedColors[index % predefinedColors.length];

        return (
          <LinkButton key={genre.id}>
            <Link to={`/genre/${genre.id}`}>
              <p>{genre.name}</p>{" "}
            </Link>
          </LinkButton>
        );
      })}
    </ScrollableRowComponent>
  );
}

export default GenreButtons;
