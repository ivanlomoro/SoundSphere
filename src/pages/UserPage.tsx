import { NavBar } from "../components/NavBar/NavBar"
import { HeaderSection } from "../components/header/Header"
import { Button } from "../components/button/Button"
import { Container } from "../components/container/Container"
import { EditUserForm } from "../components/editUserForm/EditUserForm"
import { WelcomeUserSection } from "../components/welcomeUserSection/WelcomeUserSection"

export const UserPage = () => {
  return (
    <Container>
      <main>
        <HeaderSection />
        <WelcomeUserSection />
        <EditUserForm />
        <Button content="Log out"/>
        <NavBar />
      </main>
    </Container>
  )
}
