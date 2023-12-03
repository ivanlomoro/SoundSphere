import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Playlist } from '../Types/PlaylistFormData';
import { useInteractions } from '../context/userContext/InteractionContext';
import { useRenderer } from '../hooks/useRenderer'; // Ensure this import is correct

const PlaylistDetails = () => {
    const { playlistName } = useParams<{ playlistName: string }>();
    const { playlists } = useInteractions();
    const [playlist, setPlaylist] = useState<Playlist | null>(null);

    useEffect(() => {
        const foundPlaylist = playlists.find(p => p.playlistName === playlistName);
        if (!foundPlaylist) {
            console.log('No selected playlist');
            return;
        }
        setPlaylist(foundPlaylist);
    }, [playlistName, playlists]);

    const { renderSongs: renderPlaylistSongs } = useRenderer({
        songs: playlist?.songs,
        layout: 'list',
        // Ensure other necessary parameters are passed if required
    });

    if (!playlist) return <div>No playlist found!</div>;

    return (
        <div>
            {/* Render your playlist details here */}
            <h1>{playlist.playlistName}</h1>
            {/* Render songs of the playlist */}
            {renderPlaylistSongs()}
        </div>
    );
};

export default PlaylistDetails;