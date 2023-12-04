import { Button } from "../button/Button";
import {
  AiOutlineHome,
  AiOutlinePlayCircle,
  AiOutlineUser,
  AiOutlineHeart,
  AiOutlineSearch,
} from "react-icons/ai";
import { MdFileUpload } from "react-icons/md";

import { NavLink } from "react-router-dom";
import styled from "styled-components";
import "./navbar.css";
import { type IconType } from "react-icons";
import {
  ADDMUSICPAGE,
  DISPLAYPAGE,
  FAVORITEPAGE,
  HOME,
  MYSONGSPAGE,
  SEARCHPAGE,
} from "../../routes/paths";

const StyledNavBar = styled.div`
  position: sticky;
  left: 0;
  bottom: 0;
  width: var(--w-full);
  margin-inline: auto;
  background-color: var(--clr-bg-elements);
`;

const StyledNav = styled.nav`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: var(--w-full);
  background-color: var(--clr-elements);
`;

interface StyledNavIconProps {
  icon: IconType;
  onClick?: () => void;
}

const StyledNavIcon = styled(({ icon: Icon, ...props }: StyledNavIconProps) => (
  <Icon {...props} />
))`
  position: relative;
  height: 30px;
  width: 30px;
  color: inherit;
  &:hover,
  &:active {
    color: var(--clr-accent);
  }
`;

export const NavIcon = ({ icon }: StyledNavIconProps) => {
  return <StyledNavIcon icon={icon} />;
};

export const NavBar = () => {
  return (
    <StyledNavBar>
      <StyledNav>
        <NavLink to={HOME}>
          <Button
            variant="StyledButtonNav"
            content={<NavIcon icon={AiOutlineHome} />}
            ariaLabel="Home"
          />
        </NavLink>
        <NavLink to={SEARCHPAGE}>
          <Button
            variant="StyledButtonNav"
            content={<NavIcon icon={AiOutlineSearch} />}
            ariaLabel="Search"
          />
        </NavLink>
        <NavLink to={ADDMUSICPAGE}>
          <Button
            variant="StyledButtonNav"
            content={<NavIcon icon={MdFileUpload} />}
            ariaLabel="Music Player"
          />
        </NavLink>

        <NavLink to={FAVORITEPAGE}>
          <Button
            variant="StyledButtonNav"
            content={<NavIcon icon={AiOutlineHeart} />}
            ariaLabel="favorites"
          />
        </NavLink>
        <NavLink to={MYSONGSPAGE}>
          <Button
            variant="StyledButtonNav"
            content={<NavIcon icon={AiOutlineUser} />}
            ariaLabel="User"
          />
        </NavLink>
      </StyledNav>
    </StyledNavBar>
  );
};
