import { Button } from "./button/Button"
import { AiOutlineHome } from "react-icons/ai"
import { AiOutlineHeart } from "react-icons/ai"
import { AiOutlineSearch } from "react-icons/ai"
import { AiOutlineBell } from "react-icons/ai"
import { NavLink } from "react-router-dom"


export const NavBar = () => {
    return (
        <nav>
            <NavLink to="/home">
                <Button
                    variant="StyledButtonTransparent"
                    content={<AiOutlineHome />}
                    ariaLabel="Home"    
                />
            </NavLink>
            <NavLink to="/search">
                <Button
                    variant="StyledButtonTransparent"
                    content={<AiOutlineSearch />}
                    ariaLabel="Search"    
                />
            </NavLink>
            <NavLink to="/notifications">
                <Button
                    variant="StyledButtonTransparent"
                    content={<AiOutlineBell />}
                    ariaLabel="Notifications"    
                />
            </NavLink>
            <NavLink to="/favorites">
                <Button
                    variant="StyledButtonTransparent"
                    content={<AiOutlineHeart />}
                    ariaLabel="favorites"    
                />
            </NavLink>
            
        </nav>
    )
}