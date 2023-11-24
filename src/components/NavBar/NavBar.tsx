import { Button } from '../button/Button'
import { AiOutlineHome, AiOutlinePlayCircle, AiOutlineUser, AiOutlineHeart, AiOutlineSearch } from 'react-icons/ai'

import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import './navbar.css'
import { type IconType } from 'react-icons'

const StyledNavBar = styled.div`
    position: sticky;
    left: 0;
    bottom: 0;
    width: var(--w-full);
    margin-inline: auto;
    background-color: var(--clr-bg-elements);
`

const StyledNav = styled.nav`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: var(--w-full);
    background-color: var(--clr-elements);
   
`

interface StyledNavIconProps {
    icon: IconType
    onClick?: () => void
}

const StyledNavIcon = styled(({ icon: Icon, ...props }: StyledNavIconProps) => <Icon {...props} />)`
    position: relative;
    height: 30px;
    width: 30px;
    color: inherit;    
    &:hover, /* Demostration only. The style is added to the active NavLink inside the global.css as well */ 
    &:active {
        color: var(--clr-accent);
    }
    `

export const NavIcon = ({ icon }: StyledNavIconProps) => {
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
                <NavLink to="/displaypage">
                    <Button
                        variant="StyledButtonNav"
                        content={<NavIcon icon={AiOutlinePlayCircle} />}
                        ariaLabel="Music Player"
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
