import { useNavigate } from "react-router-dom";
import { LogoComponent } from "../logo/LogoComponent";
import { Span } from "../span/Span";
import { LandingContainer } from "./LandingContainer";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext/authContext";
import { HOME } from "../../routes/paths";
import { Paragraph } from "../paragraph/Paragraph";
import { TermsContainer } from "../terms/TermsContainer";
import { Button } from "../button/Button";
import styled from "styled-components";

export const LandingComponent = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const handleLogin = () => {
    login("Jason Momoa");
    navigate(HOME);
  };
  const StyledMain = styled.main`
    width: var(--w-full);
    margin-top: var(--space-sm);
  `;

  const StyledDiv = styled.div`
    width: 100%;
    margin-block: auto;
  `;

  return (
    <>
      <LandingContainer>
        <StyledDiv>
          <header>
            <LogoComponent textTitle="SoundSphere" textSlogan="Be connected" />
          </header>
          <StyledMain>
            <Button content="Login" onClick={handleLogin} />
          </StyledMain>
        </StyledDiv>
        <footer>
          <TermsContainer>
            <Paragraph text="Al crear la cuenta o iniciar sesión, aceptas los " />
            <Span text="Términos y Condiciones legales" />
            <Paragraph text=" y la " />
            <Span text="Política de Privacidad" />
          </TermsContainer>
        </footer>
      </LandingContainer>
    </>
  );
};
