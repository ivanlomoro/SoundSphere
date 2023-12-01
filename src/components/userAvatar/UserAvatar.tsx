import styled from "styled-components";
import { useAuth0 } from '@auth0/auth0-react'
import { FaUserCircle } from "react-icons/fa";


const StyledUserAvatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: var(--radius-full);
`;

export const UserAvatar = () => {

  const { user } = useAuth0()
  console.log(user?.picture)

    return (
      <>
        {user?.picture ?
          <StyledUserAvatar src={user.picture} alt="User avatar" />
          : <FaUserCircle />
        }
      </>
    )
  
};
