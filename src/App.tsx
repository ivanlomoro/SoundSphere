import { AuthProvider } from "./context/authContext/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import { AppRouter } from "./routes/AppRouter";
AppRouter;

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
};
