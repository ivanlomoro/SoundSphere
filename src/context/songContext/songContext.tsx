import React, { useState, useEffect, createContext, ReactNode } from "react";
import type { Songs, Category } from '../../Types/SongsTypes';
import db from '../../data/db.json';
import useLocalStorage from '../../hooks/useLocalStorage';
import type { Artist } from "../../Types/SongsTypes";







type SongsContextType = {
  followed: Artist[];
  artists: Artist[];
  songs: Songs[];
  recents: Songs[];
  favorites: Songs[];
  categories: Category[];
  addToRecents: (song: Songs) => void;
  addToFavorites: (song: Songs) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
  isFollowed: (id: number) => boolean;
  toggleFavorite: (song: Songs) => void;
  addToFollowed: (artist: Artist) => void;
  removeFromFollowed: (id: number) => void;
  toggleFollowed: (artist: Artist) => void;

};

const SongsContext = createContext<SongsContextType | null>(null);

type SongsProviderProps = {
  children: ReactNode;
};

const SongsProvider: React.FC<SongsProviderProps> = ({ children }) => {
  const [songs, setSongs] = useState<Songs[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [recents, setRecents] = useLocalStorage<Songs[]>('recents', []);
  const [favorites, setFavorites] = useLocalStorage<Songs[]>('favorites', []);
  const [categories, setCategories] = useState<Category[]>([])
  const [followed, setFollowed] = useLocalStorage<Artist[]>('followed', [])

  useEffect(() => {
    setSongs(db.songData);
  }, []);

  useEffect(() => { setCategories(db.categories) }, [])
  useEffect(() => { setArtists(db.artistsData) }, [])

  const songExists = (arr: Songs[], id: number) => arr.some((song: Songs) => song.id === id);
  const artistExists = (arr: Artist[], id: number) => arr.some((artist: Artist) => artist.id === id);

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

  const removeFromFavorites = (id: number) => {
    setFavorites((currentFavorites) => currentFavorites.filter((song: Songs) => song.id !== id));
  };

  const isFavorite = (id: number): boolean => songExists(favorites, id);

  const toggleFavorite = (song: Songs) => {
    isFavorite(song.id) ? removeFromFavorites(song.id) : addToFavorites(song);
  };

  function addToFollowed(artist: Artist) {
    const { id } = artist;
    if (!followed.some((item: Artist) => item.id === id)) {
      setFollowed([...followed, artist]);
    }
  }

  function removeFromFollowed(id: number) {
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

  const isFollowed = (id: number): boolean => artistExists(followed, id);

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
        removeFromFavorites
      }}
    >
      {children}
    </SongsContext.Provider>
  );
};


export const useSongs = () => {
  const context = React.useContext(SongsContext);
  if (!context) {
    throw new Error("useSongs must be used within a SongsProvider");
  }
  return context;
};

export default SongsProvider;