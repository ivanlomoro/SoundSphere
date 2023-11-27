import React, { createContext,useEffect, useState, ReactNode, useContext } from 'react';
import { Artist, Songs } from "../../Types/SongsTypes";

export interface UserInteractionProps {
    uploadedSongs?: Songs[];
    favoriteSongs?: Songs[];
    customPlaylists?: Songs[];
    recentSongs?: Songs[];
    followedArtists?: Artist[];
    followed: Artist[];
    recents: Songs[];
    favorites: Songs[];
    addToUploadedSongs: (song: Songs) => void;
    addToRecents: (song: Songs) => void;
    addToFavorites: (song: Songs) => void;
    removeFromFavorites: (id: number) => void;
    isFavorite: (id: number) => boolean;
    isFollowed: (id: number) => boolean;
    toggleFavorite: (song: Songs) => void;
    addToFollowed: (artist: Artist) => void;
    removeFromFollowed: (id: number) => void;
    toggleFollowed: (artist: Artist) => void;
}

const InteractionContext = createContext<UserInteractionProps | null>(null);

interface UserInteractionProviderProps {
    children: ReactNode;
}

const UserInteractionProvider: React.FC<UserInteractionProviderProps> = ({ children }) => {
    const [recents, setRecents] = useState<Songs[]>([]);
    const [favorites, setFavorites] = useState<Songs[]>([]);
    const [followed, setFollowed] = useState<Artist[]>([]);
    const [uploadedSongs, setUploadedSongs] = useState<Songs[]>([]);

    useEffect(() => {
        localStorage.setItem('recents', JSON.stringify(recents));
    }, [recents]);


    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);


    useEffect(() => {
        localStorage.setItem('followed', JSON.stringify(followed));
    }, [followed]);


    const songExists = (arr: Songs[], id: number) => arr.some(song => song.id === id);
    const artistExists = (arr: Artist[], id: number) => arr.some(artist => artist.id === id);

    const addToUploadedSongs = (song: Songs) => {
        if (!songExists(uploadedSongs, song.id)) {
            setUploadedSongs(prevSongs => [song, ...prevSongs]);
        }
    };


    const addToRecents = (song: Songs) => {
        if (!songExists(recents, song.id)) {
            setRecents(prevRecents => [song, ...prevRecents]);
        }
    };

    const addToFavorites = (song: Songs) => {
        if (!songExists(favorites, song.id)) {
            setFavorites(prevFavorites => [...prevFavorites, song]);
        }
    };

    const removeFromFavorites = (id: number) => {
        setFavorites(currentFavorites => currentFavorites.filter(song => song.id !== id));
    };

    const isFavorite = (id: number): boolean => songExists(favorites, id);

    const toggleFavorite = (song: Songs) => {
        isFavorite(song.id) ? removeFromFavorites(song.id) : addToFavorites(song);
    };

    const addToFollowed = (artist: Artist) => {
        if (!artistExists(followed, artist.id)) {
            setFollowed(prevFollowed => [...prevFollowed, artist]);
        }
    };

    const removeFromFollowed = (id: number) => {
        setFollowed(currentFollowed => currentFollowed.filter(artist => artist.id !== id));
    };

    const toggleFollowed = (artist: Artist) => {
        isFollowed(artist.id) ? removeFromFollowed(artist.id) : addToFollowed(artist);
    };

    const isFollowed = (id: number): boolean => artistExists(followed, id);

    return (
        <InteractionContext.Provider value={{
            uploadedSongs,
            favoriteSongs: favorites,
            customPlaylists: [],
            followedArtists: followed,
            followed,
            addToUploadedSongs,
            recents,
            favorites,
            addToRecents,
            addToFavorites,
            removeFromFavorites,
            isFavorite,
            isFollowed,
            toggleFavorite,
            addToFollowed,
            removeFromFollowed,
            toggleFollowed,
        }}>
            {children}
        </InteractionContext.Provider>
    );
};

export const useInteractions = () => {
    const context = useContext(InteractionContext);
    if (!context) {
        throw new Error("useInteractions must be used within a UserInteractionProvider");
    }
    return context;
};

export default UserInteractionProvider;