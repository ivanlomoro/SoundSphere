import { ReactNode } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  border-radius: var(--radius-md);
  border: none;
  background: var(--clr-accent);
  padding-block: 0.5em;
  color: var(--clr-text-secondary);
  font-size: var(--fs-lg);
  width: var(--w-full);
  margin-bottom: 1em;
`;

export const StyledButtonOutline = styled(StyledButton)`
  background: none;
  padding-inline: var(--space-xl);
  border: 2px solid var(--clr-accent);
  font-weight: bold;
`;

export const UploadSoundBtn = styled(StyledButtonOutline)`
  width: 100%;
`;

const StyledButtonPill = styled(StyledButton)`
  margin-top: 1em;
  font-size: var(--fs-md);
  background-color: var(--clr-bg-tertiary);
  padding-inline: 1.4em;
  width: fit-content;
  height: 2rem;
  &&:hover {
    background-color: var(--clr-accent);
  }

  &&:focus {
    background-color: var(--clr-accent);
  }
`;

const StyledButtonPlay = styled.button`
  cursor: pointer;
  border-radius: var(--w-full);
  border: none;
  background: var(--clr-bg-primary);
  color: var(--clr-text-secondary);
  width: 17px;
  height: 17px;
  &&:hover {
    background-color: var(--clr-accent);
  }
`;

const StyledButtonMiniPlay = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  width: 1.5em;
  height: 1.5em;
  background-color: var(--clr-bg-primary);
  color: var(--clr-text-secondary);
  border: none;
  border-radius: var(--radius-full);
`;

const StyledInvisibleButton = styled(StyledButton)`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  color: var(--clr-text-secondary);
  border: none;
  padding: 1rem;
  width: fit-content;
  color: var(--clr-text-primary);
`;

export const StyledInvisibleUnderLinedButton = styled(StyledInvisibleButton)`
  text-decoration: underline;
  font-size: var(--fs-sm);
`;

const StyledButtonNav = styled.button`
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--w-full);
  height: 60px;
  background: transparent;
  color: var(--clr-text-secondary);
  border: none;

  &:before {
    content: "";
    display: none;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 2px;
    width: 40%;
    background-color: var(--clr-accent);
    z-index: 1;
  }
`;

const StyledButtonDisplayPlay = styled.button`
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  width: 100px;
  height: 42px;
  background-color: var(--clr-accent);
  color: var(--clr-text-secondary);
  border: none;
  border-radius: var(--radius-full);
`;

const StyledButtonDisplay = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  width: var(--w-full);
  height: 60px;
  background: transparent;
  color: var(--clr-text-secondary);
  border: none;
  cursor: pointer;
`;

const StyledBackButton = styled(StyledButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  color: var(--clr-text-secondary);
  border: none;
  padding: 1rem;
  width: fit-content;
  color: var(--clr-text-primary);
  margin-bottom: 0;
  cursor: pointer;
`;

type ButtonProps = {
  variant?:
    | "StyledButtonPill"
    | "StyledButtonNav"
    | "StyledButtonPlay"
    | "StyledInvisibleButton"
    | "StyledButtonDisplay"
    | "StyledButtonDisplayPlay"
    | "StyledBackButton"
    | "StyledButtonOutline"
    | "StyledButtonMiniPlay";
  ariaLabel?: string;
  onClick?: () => void;
  content?: string | ReactNode;
};

export const Button = ({
  variant,
  content,
  onClick,
  ariaLabel,
}: ButtonProps) => {
  const variants = {
    StyledButtonPill,
    StyledButtonNav,
    StyledButtonPlay,
    StyledInvisibleButton,
    StyledButtonDisplay,
    StyledButtonDisplayPlay,
    StyledBackButton,
    StyledButtonOutline,
    StyledButtonMiniPlay,
  };

  const SelectedButton = variant ? variants[variant] : StyledButton;

  return onClick ? (
    <SelectedButton aria-label={ariaLabel} onClick={onClick}>
      {content}
    </SelectedButton>
  ) : (
    <SelectedButton aria-label={ariaLabel}>{content}</SelectedButton>
  );
};
