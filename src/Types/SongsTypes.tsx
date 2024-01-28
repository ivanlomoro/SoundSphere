import { editSongType } from "../components/card/CardContainerButtons";
import { UserInterface } from "../context/songContext/songContext";
import { Dispatch, SetStateAction } from "react";
import { GenreType } from "./GenreTypes";

export type Songs = {
  id: string;
  name: string;
  Artist: Artist;
  url: string;
  thumbnail: string;
  Genre : GenreType
  isPublic: boolean;
  liked: boolean;

};

export type Category = {
  name: string;
  id: string;
};

export type Artist = {
  id: string;
  name: string;
  song?: Songs[];
  thumbnail?: string;
};

export interface SongCardProps {
  song: Songs;
  songs: Songs[];
  toggleFavorite?: (song: Songs) => void;
  isFavorite?: (id: string) => boolean;
  addToRecents?: (song: Songs) => void;
  variant?: "grid" | "list" | "card" | "fullscreen";
  isSelected?: (id: string) => boolean;
  toggleSelected?: (song: Songs) => void;
  edit?: boolean;
}

export interface SongUploadData {
  thumbnail: string;
  url?: string;
  name: string;
  genreId: string;
  isPublic: boolean;
  userCreator: string;
}

export type SongsContextType = {
  isMySong: (id: string) => boolean;
  followed?: Artist[];
  artists?: Artist[];
  songs: Songs[];
  recents: Songs[];
  favorites: Songs[];
  categories?: Category[];
  mySongs: Songs[];
  setSongs: Dispatch<SetStateAction<Songs[]>>;
  addToRecents: (song: Songs) => void;
  addToFavorites: (song: Songs) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  isFollowed: (id: string) => boolean;
  toggleFavorite: (song: Songs) => void;
  addToFollowed: (artist: Artist) => void;
  removeFromFollowed: (id: string) => void;
  toggleFollowed: (artist: Artist) => void;
  getMySongs: (user: UserInterface | null) => void;
  deleteSong: (songID: string) => void;
  isModifiedSong: boolean;
  updateSong: (songID: string, editSong: editSongType) => void;
  getSongById: (songID: string) => void;
  editedSong: Songs | null;
  errorEditedSong: boolean;
};
