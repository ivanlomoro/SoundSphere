import styled from "styled-components"
import { WelcomeUserMessage } from "../welcomeUserSection/WelcomeUserMessage";
import { ArrowBackSection } from "../arrowback/Arrowback";

const StyledHeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: var(--clr-bg-primary); 
  padding: var(--fs-md);
`;

export const HeaderSection = () => {
    return (
        <StyledHeaderSection>
            <ArrowBackSection />
            <WelcomeUserMessage text="Profile" />
        </StyledHeaderSection>
    )
}