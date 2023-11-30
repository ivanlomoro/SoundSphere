import React from 'react'
import { useInteractions } from '../context/userContext/InteractionContext'
import { useRenderer } from '../hooks/useRenderer';
import { HeaderSection } from '../components';

const PlaylistPage = () => {
    const { playlists, addToRecents, togglePlaylist, isPlaylist } = useInteractions();
    const { renderSongs: renderPlaylistSongs } = useRenderer({ songs: playlists, togglePlaylist, isPlaylist, addToRecents, layout: "list" });

  return (
    <>
          <HeaderSection text="Playlists" />
          <ul>
            <h2> Playlists</h2>
            { renderPlaylistSongs() }
          </ul>
    </>
  );
};

export default PlaylistPage