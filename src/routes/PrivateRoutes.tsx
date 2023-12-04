import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { LANDINGPAGE } from "./paths";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../components/Loader/Loader";

export const PrivateRoutes = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <Loader/>;
  return isAuthenticated ? <>{children}</> : <Navigate to={LANDINGPAGE} />;
};
