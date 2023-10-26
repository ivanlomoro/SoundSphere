import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Artists, Songs } from '../Types/SongsTypes';

interface FavoritesContextProps {
    favorites: Songs[];
    setFavorites: React.Dispatch<React.SetStateAction<Songs[]>>;
    addToFavorites: (song: Songs) => void;
    removeFromFavorites: (id: number) => void;
    isFavorite: (id: number) => boolean;
    toggleFavorite: (song: Songs) => void;
    followed: Artists[];
    setFollowed: React.Dispatch<React.SetStateAction<Artists[]>>;
    addToFollowed: (artist: Artists) => void;
    removeFromFollowed: (id: number) => void;
    isFollowed: (id: number) => boolean;
    toggleFollowed: (artist: Artists) => void;
}



const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

interface FavoritesProviderProps {
    children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
    //canciones favoritas sin guardarlas al usuario ni nada 
    const [favorites, setFavorites] = useState<Songs[]>([])
    const [followed, setFollowed] = useState<Artists[]>([])
    function isFavorite(id: number) {
        return !!favorites.some((song) => song.id === id);
    }
    
    function isFollowed(id: number) {
        return !!followed.some((artist) => artist.id === id);
    }

    const addToFavorites = (song: Songs) => {
        const { id } = song;
        if (!favorites.some((item: Songs) => item.id === id)) {
            setFavorites([...favorites,song]);
        }
    }

    const removeFromFavorites = (id: number) => {
        setFavorites((currentFavorites) =>
            currentFavorites.filter((item) => item.id !== id)
        );
    }

    const toggleFavorite = (song: Songs) => {
        if (isFavorite(song.id)) {
            removeFromFavorites(song.id);
        } else {
            addToFavorites(song);
        }
    }
     
    function addToFollowed(artist: Artists) {
        const { id } = artist;
        if (!followed.some((item: Artists) => item.id === id)) {
            setFollowed([...followed, artist]);
        }
    }

    function removeFromFollowed(id: number) {
        setFollowed((currentFollowed) =>
            currentFollowed.filter((item) => item.id !== id)
        );
    }

    function toggleFollowed(artist: Artists) {
        if (isFollowed(artist.id)) {
            removeFromFollowed(artist.id);
        } else {
            addToFollowed(artist);
        }
    }

    return (
        <FavoritesContext.Provider value={{ favorites, setFavorites, isFavorite, removeFromFavorites, toggleFavorite, addToFavorites, followed, 
            setFollowed, isFollowed, removeFromFollowed, toggleFollowed, addToFollowed
        }
        }>
            {children}
        </FavoritesContext.Provider>
     
    );
};

export const useFavorites = (): FavoritesContextProps => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context; 
};

    