import styled from "styled-components";
import { UserAvatar } from "../userAvatar/UserAvatar";
import { WelcomeUserMessage } from "./WelcomeUserMessage";
import { useAuth0 } from "@auth0/auth0-react";

const StyledWelcomeUserSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-md);
`;

export const WelcomeUserSection = () => {
  const { user } = useAuth0();
  console.log(user);

  return user ? (
    <StyledWelcomeUserSection>
      <UserAvatar />
      <WelcomeUserMessage text={`Welcome ${user.name}`} />
    </StyledWelcomeUserSection>
  ) : null;
};
