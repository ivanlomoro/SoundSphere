import React, { createContext, useContext } from "react";
import { Songs } from "../../Types/SongsTypes";
import { Playlist } from "../../Types/PlaylistFormData";
import { UserContext } from "./UserContext";
import useLocalStorage from "../../hooks/useLocalStorage";

export interface UserInteractionProps {
  recents: Songs[];
  favorites: Songs[];
  playlists: Playlist[];
  selectedSongs: Songs[];
  createNewPlaylist: (
    playlist: Playlist,
    playlistName: Playlist["playlistName"]
  ) => void;
  updatePlaylist: (
    frontId: Playlist["frontId"],
    playlistName: Playlist["playlistName"]
  ) => void;
  removeFromPlaylists: (frontId: Playlist["frontId"]) => void;
  toggleLiked: (playlist: Playlist) => void;
  isFavorite: (id: Songs["id"]) => boolean;
  isSelected: (id: Songs["id"]) => boolean;
  isLiked: (frontID: Playlist["frontId"]) => boolean;
  toggleFavorite: (song: Songs) => void;
  toggleSelected: (song: Songs) => void;
  addToSelected: (song: Songs) => void;
  addToRecents: (song: Songs) => void;
  selectedPlaylist: Playlist;
}

const placeHolderPlaylist: Playlist = {
  playlistName: "dont show in future",
  userCreator: "michee",
  thumbnail: "",
  songs: [],
  frontId: "calla",
  id: "cvndfb",
};

const InteractionContext = createContext<UserInteractionProps | null>(null);

type ProviderProps = {
  children: React.ReactNode;
};

const UserInteractionProvider: React.FC<ProviderProps> = ({ children }) => {
  const { user } = useContext(UserContext);
  const isFavorite = (id: string) => songExists(favorites, id);
  const isSelected = (id: string) => songExists(selectedSongs, id);
  const [recents, setRecents] = useLocalStorage<Songs[]>("recents", []);
  const [favorites, setFavorites] = useLocalStorage<Songs[]>("favorites", []);
  const [playlists, setPlaylists] = useLocalStorage<Playlist[]>(
    "playlists",
    []
  );

  const songExists = (arr: Songs[], id: string) =>
    arr.some((song) => song.id === id);
  const [selectedSongs, setSelectedSongs] = useLocalStorage<Playlist["songs"]>(
    "selected",
    []
  );
  const removeFromFavorites = (id: string) =>
    setFavorites((prev) => prev.filter((song) => song.id !== id));
  const [selectedPlaylist, setSelectedPlaylist] = useLocalStorage<Playlist>(
    "current",
    placeHolderPlaylist
  );
  const addToRecents = (song: Songs) => {
    if (!songExists(recents, song.id)) {
      setRecents((prev) => {
        const updatedRecents = prev.length >= 6 ? prev.slice(0, 5) : prev;
        return [song, ...updatedRecents];
      });
    }
  };
  const toggleSelected = (song: Songs) =>
    isSelected(song.id) ? removeFromSelected(song.id) : addToSelected(song);
  const addToFavorites = (song: Songs) =>
    !songExists(favorites, song.id) && setFavorites((prev) => [...prev, song]);
  const toggleFavorite = (song: Songs) =>
    isFavorite(song.id) ? removeFromFavorites(song.id) : addToFavorites(song);
  const isLiked = (frontId: Playlist["frontId"]): boolean =>
    playlists.some((playlist) => playlist.frontId === frontId);
  const playlistExists = (arr: Playlist[], playlistFrontId: string) =>
    arr.some((playlist) => playlist.frontId === playlistFrontId);
  const addToPlaylists = (playlist: Playlist) =>
    !playlistExists(playlists, playlist.frontId) &&
    setPlaylists((prev) => [playlist, ...prev]);
  const removeFromPlaylists = (frontId: Playlist["frontId"]) => {
    setPlaylists((prev) =>
      prev.filter((playlist) => playlist.frontId !== frontId)
    );
    setSelectedPlaylist(playlists[0] || placeHolderPlaylist);
  };

  const addToSelected = (song: Songs) => {
    if (selectedPlaylist && selectedPlaylist != placeHolderPlaylist) {
      const updatedPlaylist = {
        ...selectedPlaylist,
        songs: [...selectedPlaylist.songs, song],
      };
      setSelectedPlaylist(updatedPlaylist);
      setPlaylists((prevPlaylists) =>
        prevPlaylists.map((p) =>
          p.frontId === updatedPlaylist.frontId ? updatedPlaylist : p
        )
      );
    }
    if (!songExists(selectedSongs, song.id)) {
      setSelectedSongs((prevSelectedSongs) => [...prevSelectedSongs, song]);

      if (!selectedSongs.length && user) {
        const defaultPlaylistName = "New Playlist";
        const defaultThumbnail = song.thumbnail;
        const userCreatorId = user.userId;
        const newPlaylist: Playlist = {
          frontId: song.id + userCreatorId,
          playlistName: defaultPlaylistName,
          songs: selectedSongs,
          thumbnail: defaultThumbnail,
          userCreator: userCreatorId,
        };
        setSelectedPlaylist(newPlaylist);
        setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
      }
    }
  };

  const toggleLiked = (playlist: Playlist) => {
    if (isLiked(playlist.frontId)) {
      removeFromPlaylists(playlist.frontId);
    } else {
      addToPlaylists(playlist);
      setSelectedPlaylist(playlist);
    }
  };

  const createNewPlaylist = (
    playlist: Playlist,
    newName: Playlist["playlistName"]
  ) => {
    if (playlist.songs.length > 0 && user) {
      const defaultThumbnail = playlist.thumbnail;
      const userCreatorId = user.userId;
      const newPlaylist: Playlist = {
        frontId: playlist.frontId + userCreatorId,
        playlistName: newName,
        songs: playlist.songs,
        thumbnail: defaultThumbnail,
        userCreator: userCreatorId,
      };
      setSelectedPlaylist(newPlaylist);
      setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
    }
  };

  const updatePlaylist = (
    frontId: string,
    playlistName: Playlist["playlistName"]
  ) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.map((playlist) =>
        playlist.frontId === frontId ? { ...playlist, playlistName } : playlist
      )
    );
    setSelectedPlaylist((prevPlaylist) =>
      prevPlaylist.frontId === frontId
        ? { ...prevPlaylist, playlistName }
        : prevPlaylist
    );
  };

  const removeFromSelected = (id: string) => {
    if (isSelected(id)) {
      setSelectedSongs((currentSelectedSongs) => {
        const updatedSelectedSongs = currentSelectedSongs.filter(
          (song) => song.id !== id
        );
        if (
          selectedPlaylist &&
          selectedPlaylist.songs.some((song) => song.id === id)
        ) {
          const updatedPlaylist = {
            ...selectedPlaylist,
            songs: selectedPlaylist.songs.filter((song) => song.id !== id),
          };
          setSelectedPlaylist(updatedPlaylist);
          if (updatedPlaylist.songs.length === 0) {
            setPlaylists((currentPlaylists) =>
              currentPlaylists.filter(
                (playlist) => playlist.frontId !== selectedPlaylist.id
              )
            );
            playlists
              ? setSelectedPlaylist(playlists[0])
              : setSelectedPlaylist(placeHolderPlaylist);
            setSelectedSongs([]);
          }
        }
        return updatedSelectedSongs;
      });
    }
  };

  return (
    <InteractionContext.Provider
      value={{
        selectedPlaylist,
        updatePlaylist,
        createNewPlaylist,
        removeFromPlaylists,
        playlists,
        isSelected,
        selectedSongs,
        addToSelected,
        toggleSelected,
        recents,
        favorites,
        addToRecents,
        isFavorite,
        toggleFavorite,
        toggleLiked,
        isLiked,
      }}
    >
      {children}
    </InteractionContext.Provider>
  );
};

export const useInteractions = () => {
  const context = useContext(InteractionContext);
  if (!context) {
    throw new Error(
      "useInteractions must be used within a UserInteractionProvider"
    );
  }
  return context;
};

export default UserInteractionProvider;
