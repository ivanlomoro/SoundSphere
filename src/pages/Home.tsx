import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext/authContext';
import { useContext } from 'react';
import './styles.css'

export function Home() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate()
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (<>
    <div className="container red">Home
      <h1 className="user-info">
        Welcome back, {user && user?.name + " !" || 'Guest'}
      </h1>
      <button onClick={handleLogout}> Logout</button></div></>
  )
}
