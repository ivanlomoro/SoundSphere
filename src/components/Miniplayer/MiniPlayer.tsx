import { useContext, useRef, useState } from "react";
import { AiOutlineStepBackward, AiOutlineStepForward } from "react-icons/ai";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { Button } from "../button/Button";
import { ProgressBar } from "../progressBar/ProgressBar";
import { FaveButton } from "../card/card.styled.components";
import { FullHeart } from "../card/card.styled.components";
import { EmptyHeart } from "../card/card.styled.components";
import { useInteractions } from "../../context/userContext/InteractionContext";
import { PlayerContext } from "../../context/playerContext/playerContext";
import { PlayerDisplay } from "../playerDisplay/PlayerDisplay";

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

const StyledPlayer = styled(ReactPlayer)``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 3px solid red;
`;

const StyledCover = styled.img`
  max-height: 60%;
  max-width: 60%;
`;

const ResponsiveContainer = styled.div`
  max-height: 75%;
  max-width: 90%;
  margin-top: 0;
  display: flex;
  border-radius: var(--radius-sm);
  font-size: clamp(0.8rem, 1.5rem, 2rem);
  background-color: var(--clr-bg-elements);
  padding: var(--space-sm);
  margin: var(--space-sm);
  flex-direction: column;
  align-items: center;
`;

export const MiniPlayer = () => {
  return (
    <>
      <PlayerDisplay />
    </>
  );
};
