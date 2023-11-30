import ReactPlayer from "react-player";
import styled from "styled-components";
import { Songs } from "../../Types/SongsTypes";


export type CustomEventType = {
  target: HTMLProgressElement;
  nativeEvent: {
    offsetX: number;
  };
};

export const HiddenPlayer = styled.div`
  z-index: -5;
  width: 0;
  height: 0;
  visibility: hidden;
`;

export const StyledPlayer = styled(ReactPlayer)`
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 3px solid red;
 `;

export const StyledCover = styled.img`
max-height: 60%;
max-width: 60%;

`;

export const ResponsiveContainer = styled.div`
max-height: 75%;
max-width: 90%;
margin-top: 0;
  display: flex;
  border-radius: var(--radius-sm);
  font-size:clamp(0.8rem, 1.5rem, 2rem);
  background-color: var(--clr-bg-elements);
  padding: var(--space-sm);
  margin: var(--space-sm);
  flex-direction: column;
  align-items: center;
`;

export type PlayerDisplayProps = {
  songs: Songs[];
  currentSong: Songs;
};


