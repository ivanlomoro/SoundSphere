import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--clr-elements);
  padding: var(--fs-md);
;`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
;`

const UserIcon = styled.img`
  width: var(--space-xl);
  height: var(--space-xl);
  margin-right: var(--fs-md);
  border-radius: var(--radius-full);
;`

const WelcomeText = styled.h1`
  font-family: var(--ff-primary);
  font-size: var(--fs-ml);
  font-weight: 500;
  color: var(--cl-text-secondary);
;`

const NavbarHome = () => {
  const { user, isLoading } = useAuth0();

  return (
    <NavbarContainer>
      <UserInfo>
        <UserIcon src="src/assets/imgs/jason_mamoa.gif" alt="User" />
        {isLoading ? (
          "Loading..."
        ) : user ? (
          <WelcomeText>Welcome {(user && user?.name) || "Guest"}</WelcomeText>
        ) : null}
      </UserInfo>
    </NavbarContainer>
  );
};

export default NavbarHome