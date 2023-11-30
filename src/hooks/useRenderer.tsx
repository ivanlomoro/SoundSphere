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
  toggleSelected?: (song: Songs) => void;
  toggleFollowed?: (artist: Artist) => void;
  isFavorite?: (id: string) => boolean;
  isSelected?: (id: string) => boolean;
  isFollowed?: (id: string) => boolean;
  addToRecents?: (song: Songs) => void;
  
  
  layout: T;

};
  
type LayoutVariant = "grid" | "list" | "card" | undefined;
  
export const useRenderer = (input: MagicInput<LayoutVariant>) => {
    const { mySongs, songs, artists, layout} = input;
  
    const renderSongs = React.useCallback(() => {
      const songsToRender = mySongs || songs;
      return (
        <>
          {songsToRender?.map((song) => (
            <SongCard
              variant={layout}
              key={song.id}
              song={song}
   
           
            />
          ))}
        </>
      );
    }, [mySongs, songs,  layout]);
  
    const renderArtists = React.useCallback(() => {
      return (
        <>
          {artists?.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              
     
            />
          ))}
        </>
      );
    }, [artists, layout]);
  
    return { renderSongs, renderArtists };
  };
  
//How to use

// const { renderSongs: renderNormalSongs } = useRenderer({ songs, toggleFavorite, isFavorite, addToRecents, layout: "card" });