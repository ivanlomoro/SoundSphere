import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext/authContext";
import { LANDINGPAGE } from "./paths";

export const PrivateRoutes = ({ children }: { children: ReactNode }) => {
  const { isLogged } = useContext(AuthContext);
  return isLogged ? <>{children}</> : <Navigate to={LANDINGPAGE} />;
};
