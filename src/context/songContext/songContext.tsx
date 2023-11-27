import React, { useState, useEffect, createContext, ReactNode, useContext } from "react";
import type { Songs, Category, Artist } from '../../Types/SongsTypes';
import db from '../../data/db.json';



type SongsContextType = {
  artists: Artist[];
  songs: Songs[];
  categories: Category[];
};

const SongsContext = createContext<SongsContextType | null>(null);

type SongsProviderProps = {
  children: ReactNode;
};

const SongsProvider: React.FC<SongsProviderProps> = ({ children }) => {
  const [songs, setSongs] = useState<Songs[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setSongs(db.songData);
    setCategories(db.categories);
    setArtists(db.artistsData);
  }, []);

  return (
    <SongsContext.Provider value={{ artists, songs, categories }}>
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