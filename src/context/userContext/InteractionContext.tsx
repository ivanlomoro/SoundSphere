/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useEffect, useState, useContext } from 'react';
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
    children: React.ReactNode;
};

const UserInteractionProvider: React.FC<ProviderProps> = ({ children }) => {
    const { user } = useContext(UserContext);

    
    
    if (!user) {
        return <div>Loading...</div>;
    }

    
    const [recents, setRecents] = useState<Songs[]>([]);
    const [favorites, setFavorites] = useState<Songs[]>([]);
    const [uploadedSongs, setUploadedSongs] = useState<Songs[]>([]);
    const [selectedSongs, setSelectedSongs] = useState<Playlist['songs']>([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist>();
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [playlistName, setPlaylistName] = useState<Playlist['playlistName']>('');
    const [playlistCreator, setPlaylistCreator] = useState<Playlist['userCreator']>('');
    const [playlistThumbnail, setPlaylistThumbnail] = useState<Playlist['thumbnail']>('');
    
    useEffect(() => {
        localStorage.setItem('recents', JSON.stringify(recents));
        localStorage.setItem('favorites', JSON.stringify(favorites));
        localStorage.setItem('playlists', JSON.stringify(playlists));
    }, [recents, favorites, playlists]);

    useEffect(() => {
        const storedPlaylists = localStorage.getItem('playlists');
        if (storedPlaylists) {
            setPlaylists(JSON.parse(storedPlaylists));
        }
    },[playlists])
  
    const songExists = (arr: Songs[], id: string) => arr.some(song => song.id === id);
    const playlistExists = (arr: Playlist[], id: string) => arr.some(playlist => playlist.id === id);
    const addToUploadedSongs = (song: Songs) => !songExists(uploadedSongs, song.id) && setUploadedSongs(prev => [song, ...prev]);
    const addToRecents = (song: Songs) => !songExists(recents, song.id) && setRecents(prev => [song, ...prev]);
    const addToFavorites = (song: Songs) => !songExists(favorites, song.id) && setFavorites(prev => [...prev, song]);
    const removeFromPlaylists = (id: string) => setPlaylists(prev => prev.filter(playlist => playlist.id !== id));
    const addtoPlaylists = (playlist: Playlist) => setPlaylists(prev => [...prev, playlist]);
    const toggleSelected = (song: Songs) => isSelected(song.id) ? removeFromSelected(song.id) : addToSelected(song);
    const removeFromFavorites = (id: string) => setFavorites(prev => prev.filter(song => song.id !== id));
    const toggleFavorite = (song: Songs) => isFavorite(song.id) ? removeFromFavorites(song.id) : addToFavorites(song);
    const isSelected = (id: string) => songExists(selectedSongs, id)
    const isFavorite = (id: string) => songExists(favorites, id)
    const isLiked = (playlistName: string): boolean => playlists.some(playlist => playlist.playlistName === playlistName);

    const toggleLiked = (playlist: Playlist) => {
        if (isLiked(playlist.playlistName)) {
            removeFromPlaylists(playlist.playlistName);
        } else {
            addtoPlaylists(playlist);
        }
        setSelectedSongs(playlist.songs);
    };

    const addToSelected = (song: Songs) => {
        if (!songExists(selectedSongs, song.id)) {
            setSelectedSongs(prevSelectedSongs => [...prevSelectedSongs, song]);
            
            if (!selectedSongs.length) {
                const defaultPlaylistName = "New Playlist";
                const defaultThumbnail = song.thumbnail; 
                const userCreatorId = user.userId;
                const newPlaylist: Playlist = {
                    playlistName: defaultPlaylistName,
                    songs: [...selectedSongs, song], 
                    thumbnail: defaultThumbnail,
                    userCreator: userCreatorId,
                };

                setSelectedPlaylist(newPlaylist);
                setPlaylists(prevPlaylists => [...prevPlaylists, newPlaylist]);
            }
        }
    };

    
    const removeFromSelected = (id: string) => {
        if (isSelected(id)) {
            setSelectedSongs(currentSelectedSongs => {
                const updatedSelectedSongs = currentSelectedSongs.filter(song => song.id !== id);
           
                if (selectedPlaylist && selectedPlaylist.songs.some(song => song.id === id)) {
                    const updatedPlaylist = {
                        ...selectedPlaylist,
                        songs: selectedPlaylist.songs.filter(song => song.id !== id),
                    };

                    setSelectedPlaylist(updatedPlaylist);


                    if (updatedPlaylist.songs.length === 0) {
                        setPlaylists(currentPlaylists => currentPlaylists.filter(playlist => playlist.id !== selectedPlaylist.id));
                        setSelectedPlaylist(undefined);
                    }
                }
                return updatedSelectedSongs;
            });
        }
    };

    return (
        <InteractionContext.Provider value={{ uploadedSongs, favoriteSongs: favorites, selectedPlaylist, addtoPlaylists, removeFromPlaylists, playlists, isSelected, selectedSongs, addToSelected, toggleSelected, removeFromSelected, addToUploadedSongs, recents, favorites, addToRecents, addToFavorites, removeFromFavorites, isFavorite, toggleFavorite, toggleLiked, isLiked }}>
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
