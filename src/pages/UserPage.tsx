<<<<<<< HEAD
import { Button, Container, EditUserForm, HeaderSection, NavBar, WelcomeUserSection } from "../components"

=======
import { useContext } from "react"
import { Button } from "../components/button/Button"
import { Container } from "../components/containers/Container"
import { WelcomeUserSection } from "../components/welcomeUserSection/WelcomeUserSection"
import { AuthContext } from "../context/authContext/authContext"
import { UserDetails } from "../components/userDetails/UserDetails"
import { UserContainer } from "../components/containers/UserContainer"
>>>>>>> 44c6f515d323bb65da58d80e6af434f8cbf1455e

export const UserPage = () => {
  const { logout } = useContext(AuthContext)

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
