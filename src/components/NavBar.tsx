import React from 'react';
import { Nav, P} from '../StyledComponents/NavbarStyles';
import { Button } from '../StyledComponents/UIElements/Button';
const userIconURL = 'https://img.icons8.com/ios/35/FFFFFF/user--v1.png';


type User = {
  name: string;
};

type NavbarProps = {
  user?: User;
  imageClick: () => void;
  handleLogout: () => void;
};



const Navbar: React.FC<NavbarProps> = ({ user, imageClick }) => {
  return (
    <Nav>
      <Button backgroundImage={userIconURL} onClick={imageClick} />
      <P>Welcome back, {user && user.name + " !" || 'Guest'}</P>
    </Nav>
  );
};

export default Navbar;