import { LogoComponent } from "../logo/LogoComponent";
import { Span } from "../span/Span";
import { LandingContainer } from "./LandingContainer";
import { Paragraph } from "../paragraph/Paragraph";
import { TermsContainer } from "../terms/TermsContainer";
import { Button } from "../button/Button";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

import Swal from "sweetalert2";
import axios from "axios";

export const LandingComponent = () => {
  const { loginWithRedirect } = useAuth0();

  const handleClick = async () => {
    const serverURL = import.meta.env.VITE_API_BASE_URL;
    console.log("Server URL", serverURL)
    try {
      const response = await axios.get(serverURL);
      if (response.statusText === "OK") return loginWithRedirect();
    } catch (error) {
      Swal.fire({
        title: "Server Error!",
        text: "refresh and try again",
        icon: "error",
        confirmButtonText: "ok",
      });
    }
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
            <Button
              content="Login"
              onClick={(): Promise<void> => handleClick()}
            />
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
