import styled from "styled-components";
import { Button } from "../button/Button";
import { UserDetail } from "../userDetail/UserDetail";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import toast from "react-hot-toast";

const StyledUserDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`;

const resetPassword = async (userEmail: string) => {
  console.log(userEmail);
  try {
    const response = await axios.post(
      "https://dev-qdcgiaoq1b8m6fe5.us.auth0.com/dbconnections/change_password",
      {
        email: userEmail,
        connection: "Username-Password-Authentication",
        client_id: "3eb0bceRj7012DEV06qrZ2AyUZdQX04L",
      }
    );
    if (response) {
      toast.success(
        "A message was sent to your email address to reset your password."
      );
    }
    console.log(response);
  } catch {
    console.log("That didn't work");
  }
};

export const UserDetails = () => {
  const { user } = useAuth0();

  return user ? (
    <StyledUserDetailsContainer>
      <UserDetail label="Name" info={user.nickname} />
      <UserDetail label="Email" info={user.email} />
      <UserDetail label="Date of Birth" info={user.birthdate} />
      <UserDetail label="Gender" info={user.gender} />
      {user.email && (
        <Button
          content="Change password"
          variant="StyledButtonPill"
          onClick={() => resetPassword(user.email!)}
        />
      )}
    </StyledUserDetailsContainer>
  ) : null;
};
