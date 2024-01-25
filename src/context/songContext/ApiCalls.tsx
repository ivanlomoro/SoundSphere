import React, { createContext, ReactNode, useContext, useEffect } from "react";
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
  uploadSong: (songData: SongUploadData) => Promise<void>;
  publicSongs: Songs[];
  userSongs?: Songs[];
  artists: Artist[];
  albums: Album[];

}

const ApiCallsContext = createContext<ApiCallContextType | null>(null);
type ProviderProps = {
  children: ReactNode;
};

const ApiCallsProvider: React.FC<ProviderProps> = ({ children }) => {

  const [publicSongs, setPublicSongs] = React.useState<Songs[]>([]);
  const [artists, setArtists] = React.useState<Songs[]>([]);
  const [albums, setAlbums] = React.useState<Album[]>([]);
  const uploadSong = async (songData: SongUploadData) => {
    const baseUrl = `${import.meta.env.VITE_API_BASE_URL}`;
    const userID = "65647cd431a39aa197f9ebe7";
    const encodedID = encodeURIComponent(userID);
    const requestUrl = `${baseUrl}/song/${encodedID}`;
    

 

    try {
      const response = await axios.post(requestUrl, songData);
      if (response) {
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Failed to upload song:",
          error.response.data.message || "Unknown Error"
        );
      } else {
        console.error("Failed to upload song:", error);
      }
    }
  };

  const fetchSongs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}song/`
      );
      setPublicSongs(response.data);
    } catch (error) {
      console.error("Failed to fetch Songs:", error);
    }
  };
  const fetchAlbums = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}album/`
      );
      setAlbums(response.data);
    } catch (error) {
      console.error("Failed to fetch Songs:", error);
    }
  };
  const fetchArtists = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}artist/`
      );
      setArtists(response.data);
    } catch (error) {
      console.error("Failed to fetch Songs:", error);
    }
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
    fetchSongs();
    fetchArtists();
  }, []);

  return (
    <ApiCallsContext.Provider value={{albums,  artists, uploadSong, publicSongs }}>
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
