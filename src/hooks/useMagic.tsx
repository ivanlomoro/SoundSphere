import React from 'react';
import { SongCard, Songs } from '../components/card/FinalCardForMerge';
import { ScrollableRowComponent } from '../components';

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
    
      <ScrollableRowComponent>
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
        </ScrollableRowComponent>
 
    );
  }, [songs, toggleFavorite, isFavorite, addToRecents, layout]);

  return { renderSongs };
};