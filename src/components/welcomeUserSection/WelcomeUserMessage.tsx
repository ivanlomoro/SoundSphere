import styled from "styled-components";

const StyledWelcomeUserMessage = styled.p`
  color: var(--clr-text-secondary);
  font-size: 1rem;
`;

type WelcomeUserMessagePropsType = {
  text: string;
};

export const WelcomeUserMessage = ({ text }: WelcomeUserMessagePropsType) => {
  return <StyledWelcomeUserMessage>{text}</StyledWelcomeUserMessage>;
};
