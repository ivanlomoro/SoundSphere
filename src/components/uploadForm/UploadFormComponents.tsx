import { ReactNode } from "react";
import styled from "styled-components";

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: #767677;
  aspect-ratio: 1/1;
  height: 30vh;
  border-radius: 20px;
  margin-bottom: 3em;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto var(--space-xl);
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 20px;
`;

export const Button = styled.div`
  padding: 10px 20px;
  background-color: #ccc;
  color: white;
  border: none;
  border-radius: 10px;
`;

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  width: 35px;
  background-color: #ccc;
  border-radius: 15px;
  padding: 2px;
  cursor: pointer;
`;

export const Slider = styled.div<{ isPrivate: boolean }>`
  height: 20px;
  width: 50%;
  background-color: #fff;
  border-radius: 13px;
  transform: translateX(${({ isPrivate }) => (isPrivate ? "100%" : "0")});
  transition: transform 0.3s ease-in-out;
`;

export const Text = styled.span`
  text-align: center;
  color: white;
  position: absolute;
  top: 51.35em;
  left: 8em;
`;

export const Input = styled.input`
  height: 26px;
  color: var(--clr-text-secondary);
  background-color: transparent;
  border: 1px solid white;
  text-align: center;
  padding-block: 0.25em;
  font-size: var(--fs-lg);
  border-radius: var(--radius-sm);

  &:focus-visible {
    border-color: var(--clr-accent);
    outline: none;
  }

  &::placeholder {
    color: var(--clr-text-secondary);
    opacity: 0.8;
  }
`;

export const Select = styled.select`
  height: 26px;
  height: var(--space-xxl);
  border-radius: var(--radius-sm);
  color: var(--clr-text-secondary);
  background-color: var(--clr-bg-primary);
  text-align: center;
  font-size: var(--fs-lg);
  border: none;
  &:focus-visible {
    outline: none;
  }
`;

export const ButtonSummit = styled.div`
  padding: 10px 20px;
  background-color: #ccc;
  color: white;
  border: none;
  border-radius: 10px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1em;
  position: relative;
`;

export const ErrorMessage = styled.p`
  color: #dc3545;
  position: absolute;
  top: 2.25em;
`;

export const Submit = styled.button`
  bottom: 80px;
  width: 80vw;
  margin: auto;
  padding-block: 0.5em;
  color: var(--clr-text-secondary);
  border: none;
  border-radius: var(--radius-sm);
  background-color: var(--clr-accent);
  text-transform: uppercase;
  font-size: var(--fs-lg);
  font-weight: bold;
  margin-bottom: 2em;
`;

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-md);
  padding-top: var(--space-sm);
  padding-inline: var(--space-md);
`;

type ContainerProps = {
  children: ReactNode;
};

export const FormContainer = ({ children }: ContainerProps) => {
  return <StyledFormContainer>{children}</StyledFormContainer>;
};
