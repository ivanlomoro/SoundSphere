import React, { useState, useEffect, createContext, ReactNode } from "react";
import type { Songs } from '../../Types/SongsTypes';
import db from '../../data/db.json';
import { Grid, RowCard } from "../../components/card/CardComponents";

import { SongCard } from "../../components/card/CardComponent";




type SongsContextType = {
  songs: Songs[];
  recents: Songs[];
  favorites: Songs[];
  addToRecents: (song: Songs) => void;
  addToFavorites: (song: Songs) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (song: Songs) => void;
};

const SongsContext = createContext<SongsContextType | null>(null);

type SongsProviderProps = {
  children: ReactNode;
};

const SongsProvider: React.FC<SongsProviderProps> = ({ children }) => {
  const [songs, setSongs] = useState<Songs[]>([]);
  const [recents, setRecents] = useState<Songs[]>([]);
  const [favorites, setFavorites] = useState<Songs[]>([]);

  useEffect(() => {
    // Assuming db.songData is of type Songs[]
    setSongs(db.songData);
  }, []);

  const songExists = (arr: Songs[], id:number) => arr.some((song:Songs) => song.id === id);

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

  const isFavorite = (id:number): boolean => songExists(favorites, id);

  const toggleFavorite = (song: Songs) => {
    isFavorite(song.id) ? removeFromFavorites(song.id) : addToFavorites(song);
  };

  const renderGridSongs = (inputSongs: Songs[], count: number = 4) => (
    <Grid>
      {inputSongs.slice(0, count).map((song) => (
        <SongCard variant={} key={song.id} song={song} />
      ))}
    </Grid>
  );

  const renderRowSongs = (inputSongs: Songs[]) => (
    <div style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}>
      {inputSongs.map((song) => (
        <RowCard key={song.id}>
          <SongCard  song={song} />
        </RowCard>
      ))}
    </div>
  );
  return (
    <SongsContext.Provider
      value={{
        songs,
        recents,
        favorites,
        addToRecents,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
        renderGridSongs,
        renderRowSongs
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