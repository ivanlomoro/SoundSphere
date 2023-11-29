import React, { useState, useEffect, createContext, ReactNode, useContext } from "react";
import type { Songs, Category } from '../../Types/SongsTypes';
import db from '../../data/db.json';
import useLocalStorage from '../../hooks/useLocalStorage';
import type { Artist } from "../../Types/SongsTypes";
import axios from "axios";
import { UserContext } from "../userContext/UserContext";
import { useApiCalls } from "./ApiCalls";







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
  const {publicSongs} = useApiCalls()
  console.log("User traido de context", user)
  const [songs, setSongs] = useState<Songs[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [recents, setRecents] = useLocalStorage<Songs[]>('recents', []);
  const [favorites, setFavorites] = useLocalStorage<Songs[]>('favorites', []);
  const [categories, setCategories] = useState<Category[]>([])
  const [followed, setFollowed] = useLocalStorage<Artist[]>('followed', [])
  const [mySongs, setMySongs] = useState<Songs[]>([]);
  

  useEffect(() => {
    getMySongs()
    setSongs(mySongs);
  }, []);

  useEffect(() => { setCategories(db.categories) }, [])
  useEffect(() => { setArtists([]) }, [])

  const songExists = (arr: Songs[], id: string) => arr.some((song: Songs) => song.id === id);
  const artistExists = (arr: Artist[], id: string) => arr.some((artist: Artist) => artist.id === id);

  const getMySongs = async () => {

    if (user != null) {
     
      const URL = `/song`
      console.log("URL usada:", URL)


      try {
        console.log(URL)
       
        const response = await axios.get(URL)
        const userSongs: Songs[] = response.data
        setMySongs(userSongs)
        console.log(user)
        console.log("Estamos en api songs:",songs)
      } catch (error) {
        console.log(error)
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

  function removeFromFollowed(id: string) {
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
        getMySongs
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