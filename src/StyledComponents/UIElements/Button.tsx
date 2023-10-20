import styled from "styled-components";


type ButtonProps = {
  backgroundImage?: string;
  backgroundColor?: string;
};

export const Button = styled.button<ButtonProps>`
  background-image: url(${props => props.backgroundImage});
  background-size: cover; // to make sure the image covers the button
  cursor: pointer;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%; // to make it circular
`;

