import { Playlist } from '../Types/PlaylistFormData';
import { useInteractions } from '../context/userContext/InteractionContext';
import { useRenderer } from '../hooks/useRenderer';
import PlaylistActionButtons from '../components/card/PlaylistActionButtons';

const PlaylistDetails = () => {
    const {  selectedPlaylist } = useInteractions();
    const { renderSongs: renderPlaylistSongs } = useRenderer({
        songs: selectedPlaylist.songs,
         layout: 'list',    });

    const placeHolderPlaylist: Playlist = {
        playlistName: 'dont show in future',
        userCreator: 'michee',
        thumbnail: 'qualsiasi',
        songs: [],
        id: 'cvndfb',
        frontId: 'cvndfb',}
    
    if (!selectedPlaylist || (selectedPlaylist === placeHolderPlaylist)) {
        return alert('no playlist');
    };

    return (
        <div>
            <h1>{selectedPlaylist?.playlistName}</h1><PlaylistActionButtons/>
            {renderPlaylistSongs()}
        </div>
    );
};

export default PlaylistDetails;