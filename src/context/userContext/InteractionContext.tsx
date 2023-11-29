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
    removeFromFavorites: (id:string) => void;
    isFavorite: (id:string) => boolean;
    isFollowed: (id:string) => boolean;
    toggleFavorite: (song: Songs) => void;
    addToFollowed: (artist: Artist) => void;
    removeFromFollowed: (id:string) => void;
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
    const [customPlaylists, setCustomPlaylists] = useState<Songs[]>([]);

    useEffect(() => {
        localStorage.setItem('recents', JSON.stringify(recents));
    }, [recents]);

    useEffect(() => {
        localStorage.setItem('customPlaylists', JSON.stringify(customPlaylists))}, [customPlaylists])


    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);


    useEffect(() => {
        localStorage.setItem('followed', JSON.stringify(followed));
    }, [followed]);


    const songExists = (arr: Songs[], id: string) => arr.some(song => song.id === id);
    const playlistExists = (arr: Playlist[], id: string) => arr.some(playlist => playlist.id === id);

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

    const removeFromFavorites = (id: string) => {
        setFavorites(currentFavorites => currentFavorites.filter(song => song.id !== id));
    };

    const isFavorite = (id: string): boolean => songExists(favorites, id);

    const toggleFavorite = (song: Songs) => {
        isFavorite(song.id) ? removeFromFavorites(song.id) : addToFavorites(song);
    };

    const addToFollowed = (playlist: Playlist) => {
        if (!playlistExists(followed, playlist.id)) {
            setFollowed(prevFollowed => [...prevFollowed, playlist]);
        }
    };

    const removeFromFollowed = (id: string) => {
        setFollowed(currentFollowed => currentFollowed.filter(playlist => playlist.id !== id));
    };

    const toggleFollowed = (playlist: Playlist) => {
        isFollowed(playlist.id) ? removeFromFollowed(playlist.id) : addToFollowed(playlist);
    };

    const isFollowed = (id: string): boolean => playlistExists(followed, id);

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