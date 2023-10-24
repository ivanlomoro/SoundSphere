import { ReactNode } from "react"
import styled from "styled-components"


export const StyledContainerForNav = styled.nav`
    position: relative;
    min-height: 95vh;
`

type ContainerForNavProps = {
    children: ReactNode
}

