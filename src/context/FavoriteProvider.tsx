import React, { createContext, useContext, useState, ReactNode } from "react";
import { Songs } from "../Types/SongsTypes";

interface FavoritesContextProps {
  favorites: Songs[];
  setFavorites: React.Dispatch<React.SetStateAction<Songs[]>>;
  addToFavorites: (song: Songs) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (song: Songs) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined
);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Songs[]>([]);
  function isFavorite(id: number) {
    return !!favorites.some((song) => song.id === id);
  }

  const addToFavorites = (song: Songs) => {
    const { id } = song;
    if (!favorites.some((item: Songs) => item.id === id)) {
      setFavorites([...favorites, song]);
    }
  };

  const removeFromFavorites = (id: number) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((item) => item.id !== id)
    );
  };

  const toggleFavorite = (song: Songs) => {
    if (isFavorite(song.id)) {
      removeFromFavorites(song.id);
    } else {
      addToFavorites(song);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        setFavorites,
        isFavorite,
        removeFromFavorites,
        toggleFavorite,
        addToFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextProps => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
