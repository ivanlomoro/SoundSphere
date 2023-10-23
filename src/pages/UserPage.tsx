import { NavBar } from "../components/NavBar/NavBar"
import { Button } from "../components/button/Button"
import { Container } from "../components/container/Container"
import { EditUserForm } from "../components/editUserForm/EditUserForm"
import { WelcomeUserSection } from "../components/welcomeUserSection/WelcomeUserSection"

export const UserPage = () => {
  return (
    <Container>
      <main>
        <WelcomeUserSection />
        <EditUserForm />
        <Button content="Log out"/>
        <NavBar />
      </main>
    </Container>
  )
}
