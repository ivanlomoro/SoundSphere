import { Button, Container, EditUserForm, HeaderSection, NavBar, WelcomeUserSection } from "../components"


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
