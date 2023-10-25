import { NavBar } from "../components/NavBar/NavBar";
import { Button } from "../components/button/Button";
import { Container } from "../components/containers/Container";
import { EditUserForm } from "../components/editUserForm/EditUserForm";

export const EditUser = () => {
  return (
    <Container>
      <main>
        <EditUserForm />
        <Button content="Log out" />
        <NavBar />
      </main>
    </Container>
  );
};
