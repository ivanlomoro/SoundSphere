import styled from "styled-components";

const StyledSpan = styled.span`
  display: inline;
  color: var(--clr-accent);
  font-family: var(--ff-primary);
  font-size: var(--fs-md);
`;
type SpanTypes = {
  text: string;
};

export const Span = ({ text }: SpanTypes) => {
  return <StyledSpan>{text}</StyledSpan>;
};
