import { Button } from "../button/Button"
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai"
import { AiOutlineHeart } from "react-icons/ai"
import { AiOutlineSearch } from "react-icons/ai"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import './navbar.css'

const StyledNavBar = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    width: var(--w-full);
    margin-inline: auto;
`

const StyledNav= styled.nav`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: var(--w-full);
`

const StyledNavIcon = styled(({ icon: Icon, ...props }) => <Icon {...props} />)`
    position: relative;
    height: 30px;
    width: 30px;
    color: inherit;
    
    &:hover, /* Demostration only. The style is added to the active NavLink inside the global.css as well */ 
    &:active {
        color: var(--clr-accent);
    }
    `

const NavIcon = ({icon}) =>{
    return <StyledNavIcon icon={icon} />
}

export const NavBar = () => {
    return (
        <StyledNavBar>
            <StyledNav>
                <NavLink to="/home">
                    <Button
                        variant="StyledButtonNav"
                        content={<NavIcon icon={AiOutlineHome} />} 
                        ariaLabel="Home"    
                    />
                </NavLink>
                <NavLink to="/search">
                    <Button
                        variant="StyledButtonNav"
                        content={<NavIcon icon={AiOutlineSearch} />}
                        ariaLabel="Search"    
                    />
                </NavLink>
                <NavLink to="/favorites">
                    <Button
                        variant="StyledButtonNav"
                        content={<NavIcon icon={AiOutlineHeart} />}
                        ariaLabel="favorites"    
                    />
                </NavLink>
                <NavLink to="/userpage">
                    <Button
                        variant="StyledButtonNav"
                        content={<NavIcon icon={AiOutlineUser} />}
                        ariaLabel="User"    
                    />
                </NavLink>
            </StyledNav>
        </StyledNavBar>
    )
}