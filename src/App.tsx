import { AuthProvider } from "./context/authContext/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import { FavoritesProvider } from "./context/FavoriteProvider";


AppRouter;

export const App = () => {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </FavoritesProvider>
    </AuthProvider>
  );
};
