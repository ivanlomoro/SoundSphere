import React from 'react';
import { SongCard } from '../components/card/SongCard';
import { Songs } from '../Types/SongsTypes';
import { Artist } from '../Types/SongsTypes';
import { ArtistCard } from '../components/card/ArtistCard';

type MagicInput<T> = {
  mySongs?: Songs[];
  songs?: Songs[];
  artists?: Artist[];
  toggleFavorite?: (song: Songs) => void;
  toggleFollowed?: (artist: Artist) => void;
  isFavorite?: (id: string) => boolean;
  isFollowed?: (id: string) => boolean;
  addToRecents?: (song: Songs) => void;
  layout: T;
  isMySong?:boolean
};
  
  type LayoutVariant = "grid" | "list" | "card" | undefined;
  
  export const useRenderer = (input: MagicInput<LayoutVariant>) => {
    const { mySongs, songs, artists, toggleFavorite, toggleFollowed, isFavorite, isFollowed, addToRecents, layout, isMySong } = input;
  
    const renderSongs = React.useCallback(() => {
      const songsToRender = mySongs || songs;
      return (
        <>
          {songsToRender?.map((song) => (
            <SongCard
              variant={layout}
              key={song.id}
              song={song}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
              addToRecents={addToRecents}
              isMySong={isMySong}
            />
          ))}
        </>
      );
    }, [mySongs, songs, toggleFavorite, isFavorite, addToRecents, layout]);
  
    const renderArtists = React.useCallback(() => {
      return (
        <>
          {artists?.map((artist) => (
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
  
//How to use

// const { renderSongs: renderNormalSongs } = useRenderer({ songs, toggleFavorite, isFavorite, addToRecents, layout: "card" });