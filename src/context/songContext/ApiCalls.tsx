import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Artist, Songs } from "../../Types/SongsTypes";
import { Album } from '../../pages/AddMusicPage';

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
  handleNextPageSongs : () => void;
  handleNextPageAlbums : () => void;
  handleNextPageArtists : () => void;

}

const ApiCallsContext = createContext<ApiCallContextType | null>(null);
type ProviderProps = {
  children: ReactNode;
};

const ApiCallsProvider: React.FC<ProviderProps> = ({ children }) => {

  const [publicSongs, setPublicSongs] = React.useState<Songs[]>([]);
  const [artists, setArtists] = React.useState<Songs[]>([]);
  const [albums, setAlbums] = React.useState<Album[]>([]);
  const [currentPageSongs, setCurrentPageSongs] = useState(0);
  const [currentPageAlbums, setCurrentPageAlbums] = useState(0);
  const [currentPageArtists, setCurrentPageArtists] = useState(0);

  const fetchSongs = async (currentPageSongs: number) => {
    try {
      const response = await axios.get(`http://localhost:8080/song/?page=${currentPageSongs}`);
      setPublicSongs(response.data);
    } catch (error) {
      console.error("Failed to fetch Songs:", error);
    }
  };
  const fetchArtists = async (currentPageArtists : number) => {
    try {
      const response = await axios.get(`http://localhost:8080/artist/?page=${currentPageArtists}`);
      setArtists(response.data);
    } catch (error) {
      console.error("Failed to fetch Songs:", error);
    }
  };
  const fetchAlbums = async (currentPageAlbums : number) => {
    try {
      const response = await axios.get(`$http://localhost:8080/album/?page=${currentPageAlbums}`);
      setAlbums(response.data);
    } catch (error) {
      console.error("Failed to fetch Songs:", error);
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
  // const fetchPlaylists = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_API_BASE_URL}playlist/`
  //     );
  //     setPublicSongs(response.data);
  //   } catch (error) {
  //     console.error("Failed to fetch Songs:", error);
  //   }
  // };

  useEffect(() => {
    fetchSongs(0);
    fetchArtists(0);
    fetchAlbums(0);
  }, []);

  return (
    <ApiCallsContext.Provider value={{ albums, artists, publicSongs, handleNextPageAlbums, handleNextPageSongs,handleNextPageArtists  }}>
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
