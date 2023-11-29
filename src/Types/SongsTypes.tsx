import { Songs } from "../components/card/Songs";


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
	song: Songs
	toggleFavorite?: (song: Songs) => void
	isFavorite?: (id: number) => boolean
	isMySong?: boolean
	addToRecents?: (song: Songs) => void
	variant?: 'grid' | 'list' | 'card'
}
