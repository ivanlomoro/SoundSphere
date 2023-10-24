import styled from "styled-components"
import { UserAvatar } from "../userAvatar/UserAvatar"
import { WelcomeUserMessage } from "./WelcomeUserMessage"
import { useContext } from "react"
import { AuthContext } from "../../context/authContext/authContext"

const StyledWelcomeUserSection = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-md);

`

export const WelcomeUserSection = () => {
    const { user } = useContext(AuthContext)
    
    return (
        (
        user
        ? <StyledWelcomeUserSection>
                    <UserAvatar />
                    <WelcomeUserMessage text={`Welcome ${user.name}`}/>
                </StyledWelcomeUserSection>
        : null
        )
    )
}
   