import styled from "styled-components";
import { UserAvatar } from "../userAvatar/UserAvatar";
import { WelcomeUserMessage } from "./WelcomeUserMessage";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { USERPAGE } from "../../routes/paths";
import { FaUserGear } from "react-icons/fa6";
import { FC } from "react";

const StyledWelcomeUserSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-md);
  cursor: pointer;
`;

type Props = {
  editUserLogo?: boolean
}

export const WelcomeUserSection: FC<Props> = ({ editUserLogo }) => {
  const { user } = useAuth0();
  console.log(user);

  return user ? (
    <Link to={USERPAGE}>
      <StyledWelcomeUserSection>
        <UserAvatar />
        <WelcomeUserMessage text={`Welcome ${user.given_name} !`} />
        {editUserLogo &&
          <FaUserGear className="custom-icon" />
        }
      </StyledWelcomeUserSection >
    </Link>
  ) : null;
};
