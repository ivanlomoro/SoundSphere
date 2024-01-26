import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Songs } from '../../Types/SongsTypes';


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
  uploadSong: (songData: SongUploadData) => void;
  publicSongs: Songs[];
  userSongs?: Songs[];
  apiError: boolean;
}

const ApiCallsContext = createContext<ApiCallContextType | null>(null);
type ProviderProps = {
  children: ReactNode;
};


const ApiCallsProvider: React.FC<ProviderProps> = ({ children }) => {
  const [publicSongs, setPublicSongs] = React.useState<Songs[]>([]);
  const [apiError, setApiError] = useState<boolean>(false)

  const uploadSong = async (songData: SongUploadData) => {
    const baseUrl = `http://localhost:8080`;
    const userID = "65647cd431a39aa197f9ebe7";
    const encodedID = encodeURIComponent(userID);
    const requestUrl = `${baseUrl}/song/${encodedID}`;
    
    
  
   
    try {
      const response = await axios.post(requestUrl, songData);
      if (response) {
        console.log("Song uploaded successfully!", response.data);
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
    console.log("apicalls context fetchSOngs func", apiError)

    try {
      const response = await axios.get('http://localhost:8080/song/');
      setPublicSongs(response.data);
      setApiError(false)
    } catch (error) {
      console.error('Failed to fetch Songs:', error);
      setApiError(true)

    }
  };

  useEffect(() => {
      fetchSongs();
      console.log(publicSongs);

      console.log("apicalls context useeffect func", apiError)
  }, []);

  return (
    <ApiCallsContext.Provider value={{ uploadSong, publicSongs, apiError }}>
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
