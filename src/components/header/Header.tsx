import styled from "styled-components";
import { WelcomeUserMessage } from "../welcomeUserSection/WelcomeUserMessage";
import { ArrowBackSection } from "../arrowback/Arrowback";

const StyledHeaderSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  padding: var(--fs-md);
`;

type HeaderPropsType = {
  text?: string;
  withBackButton?: boolean;
  arrowBackAction?: () => void;
};

export const HeaderSection = ({
  text = "SoundSphere",
  withBackButton = true,
  arrowBackAction,
}: HeaderPropsType) => {
  return (
    <StyledHeaderSection>
      {withBackButton && <ArrowBackSection onClick={arrowBackAction} />}
      <WelcomeUserMessage text={text} />
    </StyledHeaderSection>
  );
};
