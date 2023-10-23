import { ReactNode } from "react"
import styled from "styled-components"

const StyledContainer = styled.div`
    padding-top: var(--space-sm);
    padding-inline: var(--space-md);
`

type ContainerProps = {
    children: ReactNode
}

export const Container = ({children}: ContainerProps) => {
    return (
        <StyledContainer>
            {children}
        </StyledContainer>
    )
}