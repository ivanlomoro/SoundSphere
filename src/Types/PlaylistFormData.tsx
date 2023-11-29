import toast from 'react-hot-toast';
import { Songs } from './SongsTypes';

export interface Playlist {
    id: string;
    playlistName: string;
    thumbnail: string;
    songs: Songs[];
    userCreator: string;
}
export interface PlaylistFormData {
    playlistName: string;
    thumbnail: string;
    songs: Songs[];
}
