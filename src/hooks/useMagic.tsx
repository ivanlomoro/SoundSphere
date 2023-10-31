import React from 'react';
import { SongCard, Songs } from '../components/card/FinalCardForMerge';
import { Artist } from '../Types/SongsTypes';
import { ArtistCard } from '../components/card/ArtistCard copy';

type MagicInput<T> = {
  songs?: Songs[];
  artists?: Artist[];
  toggleFavorite?: (song: Songs) => void;
  toggleFollowed?: (artist: Artist) => void;
  isFavorite?: (id: number) => boolean;
  isFollowed?: (id: number) => boolean;
  addToRecents?: (song: Songs) => void;
  layout: T;
};
  
  type LayoutVariant = "grid" | "list" | "card" | undefined;
  
  export const useMagic = (input: MagicInput<LayoutVariant>) => {
    const { songs, artists, toggleFavorite, toggleFollowed, isFavorite, isFollowed, addToRecents, layout } = input;
  
    const renderSongs = React.useCallback(() => {
      return (
        <>
          {songs?.map((song) => (
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
  
    const renderArtists = React.useCallback(() => {
      return (
        <>
          {artists?.map((artist) => (
            // Your ArtistCard component here
            <ArtistCard
              key={artist.id}
              artist={artist}
              toggleFollowed={toggleFollowed}
              isFollowed={isFollowed}
            />
          ))}
        </>
      );
    }, [artists, toggleFollowed, isFollowed, layout]);
  
    return { renderSongs, renderArtists };
  };
  