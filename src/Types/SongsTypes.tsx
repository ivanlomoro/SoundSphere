

export type Songs = {
  id: string;
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
