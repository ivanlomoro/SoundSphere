import styled from "styled-components";

const StyledParagraph = styled.p`
  display: inline;
  color: var(--cl-text-secondary);
  font-family: var(--ff-primary);
  font-size: var(--fs-md);
`;

type ParagraphTypes = {
  text: string;
};

export const Paragraph = ({ text }: ParagraphTypes) => {
  return <StyledParagraph>{text}</StyledParagraph>;
};
