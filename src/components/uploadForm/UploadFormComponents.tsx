import { ReactNode } from "react";
import styled from "styled-components";

export const ImageContainer = styled.div`
  border: 1px solid #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: #767677;
  aspect-ratio: 1/1;
  height: 30vh;
`;
export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;
export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
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
`;
export const Select = styled.select`
  height: 26px;
`;
export const ButtonSummit = styled.div`
  padding: 10px 20px;
  background-color: #ccc;
  color: white;
  border: none;
  border-radius: 10px;
`;

export const ErrorMessage = styled.p`
  color: #dc3545;
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
