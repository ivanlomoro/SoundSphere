import React, { useState } from 'react';
import { SongCard } from '../components/card/SongCard';
import { Songs } from '../Types/SongsTypes';
import { Artist } from '../Types/SongsTypes';
import { ArtistCard } from '../components/card/ArtistCard';
import { Playlist } from '../Types/PlaylistFormData';
import { PlaylistCard } from '../components/card/PlaylistCard';

type ItemType = Songs | Artist | Playlist;

type LayoutVariant = "grid" | "list" | "card" | "fullscreen" | undefined;

type MagicInput<T> = {
  songs?: Songs[];
  artists?: Artist[];
  playlists?: Playlist[];
  layout: T;
  onItemClick?: (item: ItemType) => void;
  onFullscreenClick?: () => void;
};

type CardComponent = React.FC<{ song?: Songs, artist?: Artist, playlist?: Playlist, edit: boolean, variant: LayoutVariant, onClick: () => void }>;

export const useRenderer = (input: MagicInput<LayoutVariant>) => {
  const [editMode, setEditMode] = useState(false);
  const [layout, setLayout] = useState(input.layout);
  const { songs, artists, playlists, onItemClick, onFullscreenClick } = input;

  const handleItemClick = (item: ItemType) => {
    if (onItemClick) {
      onItemClick(item);
    } else {
      setEditMode(!editMode);
    }
  };

  
  const setFullscreen = () => {
    setLayout("fullscreen");
    if (onFullscreenClick) {
      onFullscreenClick();
    }
  };

  const renderItems = React.useCallback((items: ItemType[] | undefined, Component: CardComponent) => (
    <>
      {items?.map((item) => (
        <Component
          key={'id' in item ? item.id : item.playlistName}
          {...(items === songs ? { song: item as Songs } : items === artists ? { artist: item as Artist } : { playlist: item as Playlist })}
          edit={editMode}
          variant={layout}
          onClick={() => handleItemClick(item)}
        />
      ))}
    </>
  ), [songs, artists, playlists, layout, editMode, onItemClick]);

  return {
    renderSongs: () => renderItems(songs, SongCard as CardComponent),
    renderArtists: () => renderItems(artists, ArtistCard as CardComponent),
    renderPlaylists: () => renderItems(playlists, PlaylistCard as CardComponent),
    setFullscreen
  };
};
