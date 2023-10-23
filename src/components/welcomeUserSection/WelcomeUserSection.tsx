import styled from "styled-components"
import { UserAvatar } from "../userAvatar/UserAvatar"
import { WelcomeUserMessage } from "./WelcomeUserMessage"

const StyledWelcomeUserSection = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-md);

`

export const WelcomeUserSection = () => {
    return (
        <StyledWelcomeUserSection>
            <UserAvatar />
            <WelcomeUserMessage text="Welcome Marco"/>
        </StyledWelcomeUserSection>
    )
}