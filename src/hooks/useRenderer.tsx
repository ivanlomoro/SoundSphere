import React from 'react';
import { SongCard } from '../components/card/SongCard';
import { Songs, Artist } from '../Types/SongsTypes';
import { ArtistCard } from '../components/card/ArtistCard';
import { Playlist } from '../Types/PlaylistFormData';
import { PlaylistCard } from '../components/card/PlaylistCard';

type MagicInput<T> = {
  songs?: Songs[];
  artists?: Artist[];
  playlists?: PlaylistType[];
  isMySong?: true;
  layout: T;
};

type LayoutVariant = "grid" | "list" | "card" | "fullscreen" | undefined;

export const useRenderer = (input: MagicInput<LayoutVariant>) => {
  const { songs, artists, playlists, layout } = input;

  const renderSongs = React.useCallback(() => {
    return (
      <>
        {songs?.map((song) => (
          <SongCard
            variant={layout}
            key={song.id}
            song={song}
            songs={songs}
   
          />
        ))}
      </>
    );
  }, [songs, layout]);

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
  }, [artists]);

  const renderPlaylists = React.useCallback(() => {
    return (
      <>
        {playlists?.map((playlist) => (
          <PlaylistCard
            key={playlist.frontId}
            playlist={playlist}
            variant={layout}
          />
        ))}
      </>
    );
  }, [playlists, layout]);

  return { renderSongs, renderArtists, renderPlaylists };
};