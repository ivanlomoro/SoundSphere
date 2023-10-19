import { ReactNode } from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext/authContext';


export const PrivateRoutes = ({ children }: { children: ReactNode }) => {
  const { isLogged } = useContext(AuthContext);
  console.log("isLogged:", isLogged);
  return isLogged ? (
    <>{children}</>
  ) : (
    <Navigate to={"/landingPage"} />
  );
};

