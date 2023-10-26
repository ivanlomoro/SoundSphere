import React, { useState, useEffect, createContext, ReactNode } from "react";
import type { Songs, Category  } from '../../Types/SongsTypes';
import db from '../../data/db.json';

// import { SongCard } from "../../components/card/FinalCardForMerge";
// import { RecentGrid,} from '../../components/homeContainers/FavoritesGrid'
// import { ScrollableRowComponent } from "../../components";






type SongsContextType = {
  songs: Songs[];
  recents: Songs[];
  favorites: Songs[];
  categories: Category[];
  addToRecents: (song: Songs) => void;
  addToFavorites: (song: Songs) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (song: Songs) => void;
  // renderGridSongs: (inputSongs: Songs[], count: number) => JSX.Element;
  // renderRowSongs: (inputSongs: Songs[]) => JSX.Element;
  // renderListSongs: (inputSongs: Songs[]) => JSX.Element;
};

const SongsContext = createContext<SongsContextType | null>(null);

type SongsProviderProps = {
  children: ReactNode;
};

const SongsProvider: React.FC<SongsProviderProps> = ({ children }) => {
  const [songs, setSongs] = useState<Songs[]>([]);
  const [recents, setRecents] = useState<Songs[]>([]);
  const [favorites, setFavorites] = useState<Songs[]>([]);
  const [categories, setCategories] = useState<Category[]>([])
  
  
  useEffect(() => {
    setSongs(db.songData);
  }, []);

  useEffect(() => {setCategories(db.categories)}, [])

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

  // const renderGridSongs = (inputSongs: Songs[], count: number = 4) => (
  //   <RecentGrid>
  //     {inputSongs.slice(0, count).map((song) => (
  //       <SongCard variant='grid' key={song.id} song={song} />
  //     ))}
  // </RecentGrid>
  // );

  // const renderRowSongs = (inputSongs: Songs[]) => (
  //   <ScrollableRowComponent>
  //     {inputSongs.map((song) => (
      
  //         <SongCard variant='card' key={song.id} song={song} />

  //     ))}
  //     </ScrollableRowComponent>
  // );

  // const renderListSongs = (inputSongs: Songs[]) => (
  //   <div>
  //     {inputSongs.map((song) => (
  //       <SongCard variant='list' key={song.id} song={song}/>
  //     ))}
  //   </div>
  // );

  return (
    <SongsContext.Provider
      value={{
        songs,
        recents,
        favorites,
        categories,
        addToRecents,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
        // renderGridSongs,
        // renderRowSongs,
        // renderListSongs 
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