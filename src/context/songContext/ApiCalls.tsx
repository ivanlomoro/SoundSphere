import React, { createContext, ReactNode, useContext, useEffect } from "react";
import axios from "axios";
import { SongUploadData, Songs } from "../../Types/SongsTypes";

interface ApiCallContextType {
  uploadSong: (songData: SongUploadData) => Promise<void>;
  publicSongs: Songs[];
}

const ApiCallsContext = createContext<ApiCallContextType | null>(null);
type ProviderProps = {
  children: ReactNode;
};


const ApiCallsProvider: React.FC<ProviderProps> = ({ children }) => {
  const [publicSongs, setPublicSongs] = React.useState<Songs[]>([]);
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
    try {
      const response = await axios.get('http://localhost:8080/song/public');
      setPublicSongs(response.data);
    } catch (error) {
      console.error('Failed to fetch Songs:', error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <ApiCallsContext.Provider value={{ uploadSong, publicSongs }}>
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
