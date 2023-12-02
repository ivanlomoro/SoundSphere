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





import React, { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { Artist, Songs } from '../../Types/SongsTypes';
import { Playlist } from '../../Types/PlaylistFormData';
import { UserContext } from './UserContext';



export interface UserInteractionProps {
    uploadedSongs: Songs[];
    favoriteSongs: Songs[];
    customPlaylists?: Songs[];
    selectedSongs: Songs[];
    playlists: Playlist[];
    followedArtists?: Artist[];
    followed?: Artist[];
    recents: Songs[];
    favorites: Songs[];
    addToUploadedSongs: (song: Songs) => void;
    addToRecents: (song: Songs) => void;
    addToSelected: (song: Songs) => void;
    addtoPlaylists: (playlist: Playlist) => void;
    removeFromPlaylists: (id: string) => void;
    removeFromSelected: (id: string) => void;
    toggleSelected: (song: Songs) => void;
    toggleLiked: (playlist: Playlist) => void;
    addToFavorites: (song: Songs) => void;
    removeFromFavorites: (id: string) => void;
    isFavorite: (id: string) => boolean;
    selectedPlaylist?: Playlist;
    isLiked: (id: string) => boolean;
    isSelected: (id: string) => boolean;
    toggleFavorite: (song: Songs) => void;
    

}

const InteractionContext = createContext<UserInteractionProps | null>(null);
type ProviderProps = {
    children: ReactNode;
};



const UserInteractionProvider: React.FC<ProviderProps> = ({ children }) => {
    const { user } = useContext(UserContext)
   

    const [recents, setRecents] = useState<Songs[]>([]);
    const [favorites, setFavorites] = useState<Songs[]>([]);
     const [uploadedSongs, setUploadedSongs] = useState<Songs[]>([]);
    const [selectedSongs, setSelectedSongs] = useState<Playlist['songs']>([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist>();
    const [playlistName, setPlaylistName] = useState<Playlist['playlistName']>('');
    const [playlistCreator, setPlaylistCreator] = useState<Playlist['userCreator']>('');
    const [playlistThumbnail, setPlaylistThumbnail] = useState<Playlist['thumbnail']>('');
    const [playlists, setPlaylists] = useState<Playlist[]>([]);


    useEffect(() => {
        localStorage.setItem('recents', JSON.stringify(recents));
    }, [recents]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

   
    useEffect(() => {
        localStorage.setItem('user/playlists', JSON.stringify(playlists));
    }, [playlists]);


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

    const addToSelected = (song: Songs) => {
        
        
        if (!songExists(selectedSongs, song.id)) {

            setSelectedSongs(prevSelectedSongs => [...prevSelectedSongs, song]);
            if (selectedSongs.length === 0) {
                setPlaylistName("New Playlist")
                setPlaylistThumbnail(song.thumbnail)
                console.log(playlistThumbnail)
                user && setPlaylistCreator(user.userId)
                const NewPlaylist: Playlist = {
                    playlistName: playlistName,
                    songs: selectedSongs,
                    thumbnail: playlistThumbnail,
                    userCreator: playlistCreator,
                }
                setSelectedPlaylist(NewPlaylist)
                setPlaylists(prevPlaylists => [...prevPlaylists, NewPlaylist]);
            }
        }
    }
    const toggleSelected = (song: Songs) => {
        isSelected(song.id) ? removeFromSelected(song.id) : addToSelected(song);
    };

    const removeFromSelected = (id: string) => {
        setSelectedSongs(currentSelectedSongs => currentSelectedSongs.filter(song => song.id !== id));
    };

    const isSelected = (id: string): boolean => songExists(selectedSongs, id);
    const isLiked = (playlistName: string): boolean => playlistExists(playlists, playlistName);

    const removeFromFavorites = (id: string) => {
        setFavorites(currentFavorites => currentFavorites.filter(song => song.id !== id));
    };
    const removeFromPlaylists = (id: string) => {
        setFavorites(currentFavorites => currentFavorites.filter(song => song.id !== id));
    };

    const addtoPlaylists = (playlist: Playlist) => {
        setPlaylists(prevPlaylists => [...prevPlaylists, playlist]);
    }


    const isFavorite = (id: string): boolean => songExists(favorites, id);

    const toggleFavorite = (song: Songs) => {
        isFavorite(song.id) ? removeFromFavorites(song.id) : addToFavorites(song);
    };
    const toggleLiked = (playlist: Playlist) => {

        isLiked(playlist.playlistName) ? removeFromPlaylists(playlist.playlistName) : addtoPlaylists(playlist);
    };


    return (
        <InteractionContext.Provider value={{
            uploadedSongs,
            favoriteSongs: favorites,
            selectedPlaylist,
            addtoPlaylists,
            removeFromPlaylists,
            playlists,
            isSelected,
            selectedSongs,
            addToSelected,
            toggleSelected,
            removeFromSelected,
            addToUploadedSongs,
            recents,
            favorites,
            addToRecents,
            addToFavorites,
            removeFromFavorites,
            isFavorite,
            toggleFavorite,
            toggleLiked,
            isLiked,

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