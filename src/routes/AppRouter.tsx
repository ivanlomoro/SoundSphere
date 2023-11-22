import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "../pages";
import { RouterPaths } from "./RouterPaths.routes";
import { FC } from "react";
import { PrivateRoutes } from "./PrivateRoutes";
import { useAuth0 } from "@auth0/auth0-react";

export const AppRouter: FC = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <Routes>
        <Route
          path="landingPage"
          element={isAuthenticated ? <Navigate to="/" /> : <LandingPage />}
        />
        <Route
          path="/*"
          element={
            <PrivateRoutes>
              <Routes>
                <Route path="/*" element={<RouterPaths />} />
              </Routes>
            </PrivateRoutes>
          }
        />
      </Routes>
    </>
  );
};
