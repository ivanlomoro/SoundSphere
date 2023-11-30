import { editSongType } from "../components/card/CardContainerButtons";
import { Songs } from "../components/card/Songs";
import { UserInterface } from "../context/songContext/songContext";
import { Artist, Songs, Category } from "./SongsTypes";

export type Songs = {
  id: number;
  name: string;
  artist: string;
  url: string;
  thumbnail: string;
  genre: string;
  liked: boolean;
};
export type Category = {
  name: string;
  id: number;
};

export type Artist = {
  id: number;
  name: string;
  genres: string[];
  popularity: number;
  photoUrl: string;
};
export type SongsContextType = {
  artists: Artist[];
  songs: Songs[];
  categories: Category[];
};
export interface SongCardProps {
  song: Songs;
  toggleFavorite?: (song: Songs) => void;
  isFavorite?: (id: number) => boolean;
  isMySong?: boolean;
  addToRecents?: (song: Songs) => void;
  variant?: "grid" | "list" | "card";
}
export interface SongUploadData {
  thumbnail: string;
  url: string;
  name: string;
  genreId: string;
  isPublic: boolean;
  userCreator: string;
}
export type SongsContextType = {
  followed: Artist[];
  artists: Artist[];
  songs: Songs[];
  recents: Songs[];
  favorites: Songs[];
  categories: Category[];
  mySongs: Songs[];
  addToRecents: (song: Songs) => void;
  addToFavorites: (song: Songs) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
  isFollowed: (id: number) => boolean;
  toggleFavorite: (song: Songs) => void;
  addToFollowed: (artist: Artist) => void;
  removeFromFollowed: (id: number) => void;
  toggleFollowed: (artist: Artist) => void;
  getMySongs: (user: UserInterface | null) => void;
  deleteSong: (songID: string) => void;
  isModifiedSong: boolean;
  updateSong: (songID: string, editSong: editSongType) => void;
  getSongById: (songID: string) => void;
  editedSong: Songs | null;
  errorEditedSong: boolean;
};
export interface Songs {
  id: number;
  name: string;
  artist: string;
  url: string;
  thumbnail: string;
  genre: string;
  liked: boolean;
}
export interface SongCardProps {
  song: Songs;
  toggleFavorite?: (song: Songs) => void;
  isFavorite?: (id: number) => boolean;
  isMySong?: boolean;
  addToRecents?: (song: Songs) => void;
  variant?: "grid" | "list" | "card";
}
