import styled from "styled-components";
import { Button } from "../button/Button";
import { UserDetail } from "../userDetail/UserDetail";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext/authContext";

const StyledUserDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`;

export const UserDetails = () => {
  const { user } = useContext(AuthContext);
  return user ? (
    <StyledUserDetailsContainer>
      <UserDetail label="Name" info={user.name} />
      <UserDetail label="Email" info={user.email} />
      <UserDetail label="Date of Birth" info={user.birthdate} />
      <UserDetail label="Gender" info={user.gender} />
      <Button content="Change password" variant="StyledButtonPill" />
    </StyledUserDetailsContainer>
  ) : null;
};
