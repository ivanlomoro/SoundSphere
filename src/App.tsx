import { AuthProvider } from "./context/authContext/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import SongsProvider from "./context/songContext/songContext";


AppRouter;

export const App = () => {
  return (
    <AuthProvider>
      <SongsProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </SongsProvider>
    </AuthProvider>
  );
};
