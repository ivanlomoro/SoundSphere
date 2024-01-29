import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { Artist, Songs } from "../../Types/SongsTypes";
import { Album } from "../../pages/AddMusicPage";

export interface SongUploadData {
  thumbnail: string;
  url?: string;
  name: string;
  genreId: string;
  isPublic: boolean;
  userCreator: string;
  albumId?: string;
  newAlbum?: string;
}

interface ApiCallContextType {
  publicSongs: Songs[];
  userSongs?: Songs[];
  artists: Artist[];
  albums: Album[];
  handleNextPageSongs: () => void;
  handleNextPageAlbums: () => void;
  handleNextPageArtists: () => void;
  fetchAlbumsByArtistId: (artistId: string) => void;
  fetchSongsByAlbumId: (albumId: string) => void;
}

const ApiCallsContext = createContext<ApiCallContextType | null>(null);
type ProviderProps = {
  children: ReactNode;
};

const customAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const ApiCallsProvider: React.FC<ProviderProps> = ({ children }) => {
  const [publicSongs, setPublicSongs] = useState<Songs[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [currentPageSongs, setCurrentPageSongs] = useState<number>(0);
  const [currentPageAlbums, setCurrentPageAlbums] = useState<number>(0);
  const [currentPageArtists, setCurrentPageArtists] = useState<number>(0);

  const fetchSongs = async (currentPageSongs: number) => {
    try {
      const response = await customAxios.get(`/song/?page=${currentPageSongs}`);
      setPublicSongs(response.data);
    } catch (error) {
      console.error("Failed to fetch Songs:", error);
    }
  };

  const fetchArtists = async (currentPageArtists: number) => {
    try {
      const response = await customAxios.get(
        `artist/?page=${currentPageArtists}`
      );
      setArtists(response.data);
    } catch (error) {
      console.error("Failed to fetch Artists:", error);
    }
  };

  const fetchAlbums = async (currentPageAlbums: number) => {
    try {
      const response = await customAxios.get(
        `album/?page=${currentPageAlbums}`
      );
      setAlbums(response.data);
    } catch (error) {
      console.error("Failed to fetch Albums:", error);
    }
  };

  const fetchAlbumsByArtistId = async (artistId: string): Promise<Album[]> => {
    try {
      const response = await customAxios.get(
        `album/getAlbumsByArtistId/${artistId}`
      );
      const albums: Album[] = response.data;
      return albums;
    } catch (error) {
      console.error("Failed to fetch Albums by Artist ID:", error);
      throw error;
    }
  };

  const fetchSongsByAlbumId = async (albumId: string) => {
    try {
      const response = await customAxios.get(
        `song/getSongsByAlbumId/${albumId}`
      );
      const songs: Songs[] = response.data;
      return songs;
    } catch (error) {
      console.error("Failed to fetch Songs by Album ID:", error);
    }
  };

  const handleNextPageSongs = () => {
    const nextPage = currentPageSongs + 1;
    setCurrentPageSongs(nextPage);
    fetchSongs(nextPage);
  };

  const handleNextPageAlbums = () => {
    const nextPage = currentPageAlbums + 1;
    setCurrentPageAlbums(nextPage);
    fetchAlbums(nextPage);
  };

  const handleNextPageArtists = () => {
    const nextPage = currentPageArtists + 1;
    setCurrentPageArtists(nextPage);
    fetchArtists(nextPage);
  };

  useEffect(() => {
    fetchSongs(Math.floor(Math.random() * 45));
    fetchArtists(Math.floor(Math.random() * 9));
    fetchAlbums(Math.floor(Math.random() * 25));
  }, []);

  return (
    <ApiCallsContext.Provider
      value={{
        albums,
        artists,
        publicSongs,
        handleNextPageAlbums,
        handleNextPageSongs,
        handleNextPageArtists,
        fetchAlbumsByArtistId,
        fetchSongsByAlbumId,
      }}
    >
      {children}
    </ApiCallsContext.Provider>
  );
};

export const useApiCalls = () => {
  const context = useContext(ApiCallsContext);
  if (!context) {
    throw new Error("useApiCalls must be used within an ApiCallsProvider");
  }
  return context;
};

export default ApiCallsProvider;
