import { Playlist } from '../Types/PlaylistFormData';
import { useInteractions } from '../context/userContext/InteractionContext';
import { useRenderer } from '../hooks/useRenderer'; // Ensure this import is correct
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
    }

    

    return (
        <div>
           
            <h1>{selectedPlaylist?.playlistName}</h1><PlaylistActionButtons/>
            <h2></h2>
      
            {renderPlaylistSongs()}
        </div>
    );
};

export default PlaylistDetails;