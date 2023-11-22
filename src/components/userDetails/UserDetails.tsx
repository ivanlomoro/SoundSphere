import styled from "styled-components";
import { Button } from "../button/Button";
import { UserDetail } from "../userDetail/UserDetail";
import { useAuth0 } from "@auth0/auth0-react";

const StyledUserDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`;

export const UserDetails = () => {
  const { user } = useAuth0();

  return user ? (
    <StyledUserDetailsContainer>
      <UserDetail label="Name" info={user.nickname} />
      <UserDetail label="Email" info={user.email} />
      <UserDetail label="Date of Birth" info={user.birthdate} />
      <UserDetail label="Gender" info={user.gender} />
      <Button content="Change password" variant="StyledButtonPill" />
    </StyledUserDetailsContainer>
  ) : null;
};
