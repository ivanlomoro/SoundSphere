import { Button } from "../components/button/Button";
import { Container } from "../components/containers/Container";
import { WelcomeUserSection } from "../components/welcomeUserSection/WelcomeUserSection";
import { UserDetails } from "../components/userDetails/UserDetails";
import { UserContainer } from "../components/containers/UserContainer";
import { HeaderSection } from "../components";
import { useAuth0 } from "@auth0/auth0-react";

export const UserPage = () => {
  const { logout } = useAuth0();

  return (
    <Container>
      <HeaderSection text="Profile" />
      <UserContainer>
        <WelcomeUserSection />
        <UserDetails />
      </UserContainer>
      <Button content="Log out" onClick={logout} />
    </Container>
  );
};
