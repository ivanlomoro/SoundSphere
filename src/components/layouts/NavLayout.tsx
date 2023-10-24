import { Outlet } from "react-router-dom"
import { NavBar } from "../NavBar/NavBar"
import styled from "styled-components"

const StyledNavLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 97vh;
`

export const NavLayout = ()=>{
    return (
        <StyledNavLayout className="min-h-screen">
            <Outlet />
            <NavBar />
        </StyledNavLayout>
    )
}