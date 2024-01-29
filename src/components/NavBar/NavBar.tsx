import { Button } from "../button/Button";
import { FC } from "react";
import {
  AiOutlineHome,
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
  FAVORITEPAGE,
  HOME,
  MYSONGSPAGE,
  SEARCHPAGE,
} from "../../routes/paths";

const StyledNavBar = styled.div<{ isNavLayout?: boolean }>`
  position: sticky;
  left: 0;
  bottom: 0;
  width: var(--w-full);
  margin-inline: auto;
  background-color: #111111c2;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 1)
  );
  backdrop-filter: blur(6px);
  padding-top: ${({ isNavLayout }) => (isNavLayout ? "30px" : "75px")};
`;

const StyledNav = styled.nav`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: var(--w-full);
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

type NavBarProps = {
  isNavLayout?: boolean;
};

export const NavBar: FC<NavBarProps> = ({ isNavLayout }) => {
  return (
    <StyledNavBar isNavLayout={isNavLayout}>
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
