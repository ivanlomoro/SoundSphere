import styled from "styled-components";
import { UserDetail } from "../userDetail/UserDetail";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";

const StyledUserDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`;

const StyledRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
      <UserDetail label="Name" info={user.name} />
      <UserDetail label="Nickname" info={user.nickname} />
      <UserDetail label="Email" info={user.email} />
      <UserDetail label="Phone" info={user.phone_number} />
      {/* <UserDetail label="Location" info={user.locale} /> */}
      {user.email && (
        <>
          <StyledRowContainer>
            <UserDetail label="Password" info="*******" />
            <FaEdit className="custom-icon" onClick={() => resetPassword(user.email!)} />
          </StyledRowContainer>
        </>
      )}
    </StyledUserDetailsContainer>
  ) : null;
};
