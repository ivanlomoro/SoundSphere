import { Songs } from "../Types/SongsTypes";

export type PlaylistType = {
  songs: any;
  thumbnail?: string;
  playlistName: string;
  UserCreator: string;
  playlistSongs: Songs[];
  id: string;
};
