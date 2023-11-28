import { Button } from "../components/button/Button";
import { Container } from "../components/containers/Container";
import { WelcomeUserSection } from "../components/welcomeUserSection/WelcomeUserSection";
import { UserDetails } from "../components/userDetails/UserDetails";
import { UserContainer } from "../components/containers/UserContainer";
import { HeaderSection } from "../components";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { MYSONGSPAGE } from "../routes/paths";

export const UserPage = () => {
  const { logout } = useAuth0();
  const Navigate = useNavigate();

  const goToMysongs = () => {
    Navigate(MYSONGSPAGE)
  }

  return (
    <Container>
      <HeaderSection text="Profile" />
      <UserContainer>
        <WelcomeUserSection />
        <UserDetails />
      </UserContainer>
      <Button variant="StyledButtonPill" content="My songs" onClick={goToMysongs} />
      <Button content="Log out" onClick={logout} />
    </Container>
  );
};
