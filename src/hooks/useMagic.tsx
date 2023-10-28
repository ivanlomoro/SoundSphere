import React from 'react';
import { SongCard, Songs } from '../components/card/FinalCardForMerge';


type MagicInput<T> = {
    songs: Songs[];
    toggleFavorite: (song: Songs) => void;
    isFavorite: (id: number) => boolean;
    addToRecents: (song: Songs) => void;
    layout: T;
  };
  
  type LayoutVariant = "grid" | "list" | "card" | undefined;
  
  export const useMagic = (input: MagicInput<LayoutVariant>) => {
  const { songs, toggleFavorite, isFavorite, addToRecents, layout } = input;

  const renderSongs = React.useCallback(() => {
    return (
    <>
     
        {songs.map((song) => (
          <SongCard
            variant={layout}
            key={song.id}
            song={song}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            addToRecents={addToRecents}
          />
          
        ))}
       
 </>
    );
  }, [songs, toggleFavorite, isFavorite, addToRecents, layout]);

  return { renderSongs };
};