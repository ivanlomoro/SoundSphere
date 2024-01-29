import { Button } from "../components/button/Button";
import { WelcomeUserSection } from "../components/welcomeUserSection/WelcomeUserSection";
import { UserDetails } from "../components/userDetails/UserDetails";
import { UserContainer } from "../components/containers/UserContainer";
import { HeaderSection } from "../components/header/Header";
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components";

const StyledProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-md);
  min-height: 75vh;
  padding-top: var(--space-sm);
  padding-inline: var(--space-md);
`;

export const UserPage = () => {
  const { logout } = useAuth0();

  return (
    <>
      <HeaderSection text="Profile" />
      <StyledProfileContainer>
        <UserContainer>
          <WelcomeUserSection />
          <UserDetails />
        </UserContainer>
        <Button
          content="Log out"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        />
      </StyledProfileContainer>
    </>
  );
};
