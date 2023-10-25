import { useContext } from "react"
import { Button } from "../components/button/Button"
import { Container } from "../components/containers/Container"
import { WelcomeUserSection } from "../components/welcomeUserSection/WelcomeUserSection"
import { AuthContext } from "../context/authContext/authContext"
import { UserDetails } from "../components/userDetails/UserDetails"
import { UserContainer } from "../components/containers/UserContainer"
import { HeaderSection } from "../components"

export const UserPage = () => {
  const { logout } = useContext(AuthContext)

  return (
      <Container>
          <HeaderSection text="Profile"/>
          <UserContainer>
          <WelcomeUserSection />
          <UserDetails />
          </UserContainer>
          <Button content="Log out" onClick={logout}/>
      </Container>
  )
}