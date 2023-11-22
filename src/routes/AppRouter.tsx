import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "../pages";
import { RouterPaths } from "./RouterPaths.routes";
import { FC, useContext } from "react";
import { AuthContext } from "../context/authContext/authContext";

export const AppRouter: FC = () => {
  const { isLogged } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route
          path="landingPage"
          element={isLogged ? <Navigate to="/" /> : <LandingPage />}
        />
        <Route
          path="/*"
          element={
            <Routes>
              <Route path="/*" element={<RouterPaths />} />
            </Routes>
          }
        />
      </Routes>
    </>
  );
};
