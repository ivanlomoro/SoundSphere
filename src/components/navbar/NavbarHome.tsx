import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext/authContext";
import styled from 'styled-components';

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--clr-bg-primary); 
  padding: var(--fs-md);
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`

const UserIcon = styled.img`
  width: var(--space-xl); 
  height: var(--space-xl);
  margin-right: var(--fs-md);
  border-radius: var(--radius-full);
`

const WelcomeText = styled.h1`
  font-family: var(--ff-primary);
  font-size: var(--fs-ml);
  font-weight: 500; 
  color: var(--cl-text-secondary);
`


export const NavbarHome = () => {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout();
        navigate("/")
    }

    return (
        <NavbarContainer>
            <UserInfo>
                <UserIcon src="src/assets/imgs/jason_mamoa.gif" alt="User" />
                <WelcomeText>Welcome {user && user?.name || 'Guest'}</WelcomeText>
            </UserInfo>
            <button onClick={handleLogout}>Logout</button>
        </NavbarContainer>
    );
};

