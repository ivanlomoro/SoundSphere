import React, { createContext, useContext } from 'react';
import { Artist, Songs } from '../../Types/SongsTypes';
import { Playlist } from '../../Types/PlaylistFormData';
import { UserContext } from './UserContext';
import useLocalStorage from '../../hooks/useLocalStorage';

export interface UserInteractionProps {
    favoriteSongs: Songs[];
    customPlaylists?: Songs[];
    selectedSongs: Songs[];
    playlists: Playlist[];
    followedArtists?: Artist[];
    followed?: Artist[];
    recents: Songs[];
    favorites: Songs[];
    addToUploadedSongs?: (song: Songs) => void;
    addToRecents: (song: Songs) => void;
    addToSelected: (song: Songs) => void;
    addToPlaylists: (playlist: Playlist) => void;
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
const placeHolderPlaylist: Playlist = {
    playlistName: 'dont show in future',
    userCreator: 'michee',
    thumbnail: 'qualsiasi',
    songs: [],
    id: "string",
    frontId: "id"
}

const InteractionContext = createContext<UserInteractionProps | null>(null);

type ProviderProps = {
    children: React.ReactNode;
};

const UserInteractionProvider: React.FC<ProviderProps> = ({ children }) => {
    const { user } = useContext(UserContext);
    const [recents, setRecents] = useLocalStorage<Songs[]>('recents', []);
    const [favorites, setFavorites] = useLocalStorage<Songs[]>('favorites', []);
    const [selectedSongs, setSelectedSongs] = useLocalStorage<Playlist['songs']>('selected', []);
    const [selectedPlaylist, setSelectedPlaylist] = useLocalStorage<Playlist>('current', placeHolderPlaylist);
    const [playlists, setPlaylists] = useLocalStorage<Playlist[]>('playlists', []);
    const songExists = (arr: Songs[], id: string) => arr.some(song => song.id === id);
    const playlistExists = (arr: Playlist[], playlistName: string) => arr.some(playlist => playlist.playlistName === playlistName);
    const addToPlaylists = (playlist: Playlist) => !playlistExists(playlists, playlist.playlistName) && setPlaylists(prev => [playlist, ...prev]);
    const addToRecents = (song: Songs) => !songExists(recents, song.id) && setRecents(prev => [song, ...prev]);
    const addToFavorites = (song: Songs) => !songExists(favorites, song.id) && setFavorites(prev => [...prev, song]);
    const removeFromPlaylists = (id: string) => setPlaylists(prev => prev.filter(playlist => playlist.id !== id));
    const toggleSelected = (song: Songs) => isSelected(song.id) ? removeFromSelected(song.id) : addToSelected(song);
    const removeFromFavorites = (id: string) => setFavorites(prev => prev.filter(song => song.id !== id));
    const toggleFavorite = (song: Songs) => isFavorite(song.id) ? removeFromFavorites(song.id) : addToFavorites(song);
    const isSelected = (id: string) => songExists(selectedSongs, id)
    const isFavorite = (id: string) => songExists(favorites, id)
    const isLiked = (playlistName: string): boolean => playlists.some(playlist => playlist.playlistName === playlistName);

    const addToSelected = (song: Songs) => {
        if (selectedPlaylist && selectedPlaylist != placeHolderPlaylist) {
            const updatedPlaylist = {
                ...selectedPlaylist,
                songs: [...selectedPlaylist.songs, song],
            };
            setSelectedPlaylist(updatedPlaylist)
            setPlaylists(prevPlaylists =>
                prevPlaylists.map(p => p.id === updatedPlaylist.id ? updatedPlaylist : p));
        }
        if (!songExists(selectedSongs, song.id)) {
            setSelectedSongs(prevSelectedSongs => [...prevSelectedSongs, song]);

            if (!selectedSongs.length && user) {
                const defaultPlaylistName = "New Playlist";
                const defaultThumbnail = song.thumbnail;
                const userCreatorId = user.userId;
                const newPlaylist: Playlist = {
                    id: song.id + userCreatorId,
                    playlistName: defaultPlaylistName,
                    songs: selectedSongs,
                    thumbnail: defaultThumbnail,
                    userCreator: userCreatorId,
                    frontId: ""
                };
                setSelectedPlaylist(newPlaylist);
                setPlaylists(prevPlaylists => [...prevPlaylists, selectedPlaylist]);

            }
        }
    };
    const toggleLiked = (playlist: Playlist) => {
        if (isLiked(playlist.playlistName)) {
            removeFromPlaylists(playlist.playlistName);
        } else {
            addToPlaylists(playlist);
        }
        setSelectedSongs(playlist.songs);
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
                        setSelectedPlaylist(placeHolderPlaylist);
                    }
                }
                return updatedSelectedSongs;
            });
        }
    };

    return (
        <InteractionContext.Provider value={{ favoriteSongs: favorites, selectedPlaylist, addToPlaylists, removeFromPlaylists, playlists, isSelected, selectedSongs, addToSelected, toggleSelected, removeFromSelected, recents, favorites, addToRecents, addToFavorites, removeFromFavorites, isFavorite, toggleFavorite, toggleLiked, isLiked }}>
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
