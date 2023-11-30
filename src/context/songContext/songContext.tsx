import React, { useState, useEffect, createContext, ReactNode, useContext } from "react";
import type { Songs, Category } from '../../Types/SongsTypes';
import db from '../../data/db.json';
import useLocalStorage from '../../hooks/useLocalStorage';
import type { Artist } from "../../Types/SongsTypes";
import axios from "axios";
import { UserContext } from "../userContext/UserContext";
import { editSongType } from "../../components/card/CardContainerButtons";
import { useApiCalls } from "./ApiCalls";
const apiUrl = import.meta.env.VITE_AUTH0_AUDIENCE;

type SongsContextType = {
  followed: Artist[];
  artists: Artist[];
  songs: Songs[];
  recents: Songs[];
  favorites: Songs[];
  categories: Category[];
  mySongs: Songs[];
  addToRecents: (song: Songs) => void;
  addToFavorites: (song: Songs) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  isFollowed: (id: string) => boolean;
  toggleFavorite: (song: Songs) => void;
  addToFollowed: (artist: Artist) => void;
  removeFromFollowed: (id: string) => void;
  toggleFollowed: (artist: Artist) => void;
  getMySongs: (user: UserInterface | null) => void;
  deleteSong: (songID: string) => void;
  isModifiedSong: boolean;
  updateSong: (songID: string, editSong: editSongType) => void;
  getSongById: (songID: string) => void;
  editedSong: Songs | null
  errorEditedSong: boolean
};

const SongsContext = createContext<SongsContextType | null>(null);

type SongsProviderProps = {
  children: ReactNode;
};

export type UserInterface = {
  userId: string
}

const SongsProvider: React.FC<SongsProviderProps> = ({ children }) => {
  const { user } = useContext(UserContext)
  const [songs, setSongs] = useState<Songs[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [recents, setRecents] = useLocalStorage<Songs[]>('recents', []);
  const [favorites, setFavorites] = useLocalStorage<Songs[]>('favorites', []);
  const [categories, setCategories] = useState<Category[]>([])
  const [followed, setFollowed] = useLocalStorage<Artist[]>('followed', [])
  const [mySongs, setMySongs] = useState<Songs[]>([]);
  const [isModifiedSong, setIsModifiedSong] = useState<boolean>(false);
  const [editedSong, setEditedSong] = useState<Songs | null>(null);
  const [errorEditedSong, setErrorEditedSong] = useState<boolean>(true);
  const {publicSongs} = useApiCalls()

  useEffect(() => {
    setSongs(publicSongs);
    getMySongs(user)
  }, []);

  useEffect(() => { setIsModifiedSong(false) }, [isModifiedSong])
  useEffect(() => { setErrorEditedSong(true) }, [errorEditedSong])

  const songExists = (arr: Songs[], id: string) => arr.some((song: Songs) => song.id === id);

  const artistExists = (arr: Artist[], id: string) => arr.some((artist: Artist) => artist.id === id);

  const getMySongs = async (user: UserInterface | null) => {

    if (user != null) {
      const userId = user.userId
      const URL = `${apiUrl}/song/user/${userId}`


      try {
        const response = await axios.get(URL)
        const userSongs: Songs[] = response.data
        setMySongs(userSongs)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getSongById = async (songId: string) => {
    if (songId != null) {
      const URL = `${apiUrl}/song/${songId}`
      try {
        const response = await axios.get(URL)
        const song: Songs = response.data
        setEditedSong(song)
        console.log("Esta es la cancion get songbyid:", song)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const deleteSong = async (songId: string) => {
    if (songId != null) {
      const URL = `${apiUrl}/song/${songId}`;

      try {
        const response = await axios.delete(URL);
        if (response.status === 204) {
          setIsModifiedSong(true)
        } else {
          console.error(`Error deleting song: ${response.statusText}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateSong = async (songId: string, editSong: editSongType) => {
    if (songId != null) {
      const URL = `${apiUrl}/song/${songId}`;
      try {
        const response = await axios.patch(URL, editSong);
        if (response.status === 201) {
          setIsModifiedSong(true)
          setErrorEditedSong(false)
        } else {
          console.error(`Error updating song: ${response.statusText}`);
          setErrorEditedSong(true)
        }
      } catch (error) {
        console.error(error);
        setErrorEditedSong(true);
      }
    }
  }

  const addToRecents = (song: Songs) => {
    if (!songExists(recents, song.id)) {
      setRecents([song, ...recents]);
    }
  };



  const addToFavorites = (song: Songs) => {
    if (!songExists(favorites, song.id)) {
      setFavorites([...favorites, song]);
    }
  };

  const removeFromFavorites = (id: string) => {
    setFavorites((currentFavorites) => currentFavorites.filter((song: Songs) => song.id !== id));
  };

  const isFavorite = (id: string): boolean => songExists(favorites, id);

  const toggleFavorite = (song: Songs) => {
    isFavorite(song.id) ? removeFromFavorites(song.id) : addToFavorites(song);
  };

  function addToFollowed(artist: Artist) {
    const { id } = artist;
    if (!followed.some((item: Artist) => item.id === id)) {
      setFollowed([...followed, artist]);
    }
  }

  function removeFromFollowed(id:string) {
    setFollowed((currentFollowed) =>
      currentFollowed.filter((item) => item.id !== id)
    );
  }

  function toggleFollowed(artist: Artist) {
    if (isFollowed(artist.id)) {
      removeFromFollowed(artist.id);
    } else {
      addToFollowed(artist);
    }
  }

  const isFollowed = (id: string): boolean => artistExists(followed, id);

  return (
    <SongsContext.Provider
      value={{
        artists,
        followed,
        songs,
        recents,
        favorites,
        categories,
        isFavorite,
        isFollowed,
        addToRecents,
        addToFollowed,
        toggleFavorite,
        toggleFollowed,
        addToFavorites,
        removeFromFollowed,
        removeFromFavorites,
        mySongs,
        getMySongs,
        deleteSong,
        isModifiedSong,
        updateSong,
        getSongById,
        editedSong,
        errorEditedSong
      }}
    >
      {children}
    </SongsContext.Provider>
  );
};

export const useSongs = () => {
  const context = useContext(SongsContext);
  if (!context) {
    throw new Error("useSongs must be used within a SongsProvider");
  }
  return context;
};

export default SongsProvider;