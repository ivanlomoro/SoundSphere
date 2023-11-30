//copiar favorites
//guardarlo a playlist
//pagina para playlist (todas)
//pagina de la playlist (unica)
//guarda en local hasta que se modifique el nombre o token expires
//luego post
//cambiar song a una llamada custom para canciones de usuario 

// flow click button=> addtoPlaylist defautl last playlist
// if new default name my playlist (check, if not increment)
// toaster added to song (useRender, grid)
// generate myplaylists in user page/home
// pencil next to name to modify, when submitting post
// in back end => owner middleware (checks if userId= OwnerId)





import React, { createContext,useEffect, useState, ReactNode, useContext } from 'react';
import { Artist, Songs } from "../../Types/SongsTypes";
import { UserContext } from './UserContext';
import { useSongs } from '../songContext/songContext';

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
    removeFromFavorites: (id: string) => void;
    isFavorite: (id: string) => boolean;
    isFollowed: (id: string) => boolean;
    toggleFavorite: (song: Songs) => void;
    addToFollowed: (artist: Artist) => void;
    removeFromFollowed: (id: string) => void;
    toggleFollowed: (artist: Artist) => void;
}

const InteractionContext = createContext<UserInteractionProps | null>(null);

interface UserInteractionProviderProps {
    children: ReactNode;
}

interface Playlist {
 name: string;
 songs: Songs[];
 thumbnail: string;
}

const UserInteractionProvider: React.FC<UserInteractionProviderProps> = ({ children }) => {
    const { user } = useContext(UserContext);
    const { songs } = useSongs()
    const [recents, setRecents] = useState<Songs[]>([]);
    const [favorites, setFavorites] = useState<Songs[]>([]);
    const [followed, setFollowed] = useState<Artist[]>([]);
    const [uploadedSongs, setUploadedSongs] = useState<Songs[]>([]);
    const [selectedSongs, setSelectedSongs] = useState<Songs[]>([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist>();
    const [playlistName, setPlaylistName] = useState<Playlist['name']>('');
    const [playlistThumbnail, setPlaylistThumbnail] = useState<Playlist['thumbnail']>('');
    const [playlists, setPlaylists] = useState<Playlist[]>([]);


    useEffect(() => {
        localStorage.setItem('recents', JSON.stringify(recents));
    }, [recents]);


    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);


    useEffect(() => {
        localStorage.setItem('followed', JSON.stringify(followed));
    }, [followed]);
  



    const songExists = (arr: Songs[], id: string) => arr.some(song => song.id === id);
    const artistExists = (arr: Artist[], id: string) => arr.some(artist => artist.id === id);

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
    const addToSelected = (song: Songs) => {
        if (!songExists(selectedSongs, song.id)) {
            setSelectedSongs(prevSelectedSongs => [...prevSelectedSongs, song]);
        }
    };

    const removeFromSelected = (id: string) => {
        setSelectedSongs(currentSelectedSongs => currentSelectedSongs.filter(song => song.id !== id));
    };
    const isSelected = (id: string): boolean => songExists(favorites, id);
    const removeFromFavorites = (id: string) => {
        setFavorites(currentFavorites => currentFavorites.filter(song => song.id !== id));
    };

    const isFavorite = (id: string): boolean => songExists(favorites, id);

    const toggleFavorite = (song: Songs) => {
        isFavorite(song.id) ? removeFromFavorites(song.id) : addToFavorites(song);
    };

    const addToFollowed = (artist: Artist) => {
        if (!artistExists(followed, artist.id)) {
            setFollowed(prevFollowed => [...prevFollowed, artist]);
        }
    };

    const removeFromFollowed = (id: string) => {
        setFollowed(currentFollowed => currentFollowed.filter(artist => artist.id !== id));
    };

    const toggleFollowed = (artist: Artist) => {
        isFollowed(artist.id) ? removeFromFollowed(artist.id) : addToFollowed(artist);
    };

    const isFollowed = (id: string): boolean => artistExists(followed, id);

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