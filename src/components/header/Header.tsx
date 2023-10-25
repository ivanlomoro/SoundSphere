import styled from "styled-components"
import { WelcomeUserMessage } from "../welcomeUserSection/WelcomeUserMessage";
import { ArrowBackSection } from "../arrowback/Arrowback";

const StyledHeaderSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--clr-bg-primary); 
  padding: var(--fs-md);
`;

type HeaderPropsType = {
    text?: string
}

export const HeaderSection = ({text = "SoundSphere"}:HeaderPropsType) => {
    return (
        <StyledHeaderSection>
            <ArrowBackSection />
            <WelcomeUserMessage text={text} />
        </StyledHeaderSection>
    )
}