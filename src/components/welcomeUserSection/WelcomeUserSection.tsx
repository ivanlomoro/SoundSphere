import styled from "styled-components";
import { UserAvatar } from "../userAvatar/UserAvatar";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { USERPAGE } from "../../routes/paths";
import { FC } from "react";

const StyledWelcomeUserSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-md);
  cursor: pointer;
  margin-top: 0.5rem;
  margin-inline: 2em;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--space-md);
`;

type Props = {
  editUserLogo?: boolean;
};

export const WelcomeUserSection: FC<Props> = () => {
  const { user } = useAuth0();
  return user ? (
    <Link to={USERPAGE}>
      <StyledWelcomeUserSection>
        <RowContainer>
          <UserAvatar />
        </RowContainer>
      </StyledWelcomeUserSection>
    </Link>
  ) : null;
};
