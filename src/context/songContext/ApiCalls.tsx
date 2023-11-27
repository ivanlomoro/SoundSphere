import React, {  createContext, ReactNode, useContext } from "react";
import axios from "axios";

type SongUploadData = {
    thumbnail: string | null;
    url: string | null;
    name: string;
    genreId: string;
    isPublic: boolean; 
    userCreator: string; 
  };

interface ApiCallContextType {
    uploadSong: (songData: SongUploadData) => Promise<void>;
}

const ApiCallsContext = createContext<ApiCallContextType | null>(null);


const baseUrl = `http://localhost:8080`;

type ProviderProps = {
    children: ReactNode;
};

const ApiCallsProvider: React.FC<ProviderProps> = ({ children }) => {
    const uploadSong = async (songData: SongUploadData) => {
        const userID = "6562012b45ac8690c4290edc";
        const encodedID = encodeURIComponent(userID);
        const requestUrl = `${baseUrl}/song/${encodedID}`;

        try {
            const response = await axios.post(requestUrl, songData);
            if (response) {
                console.log('Song uploaded successfully!', response.data);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Failed to upload song:', error.response.data.message || 'Unknown Error');
            } else {
                console.error('Failed to upload song:', error);
            }
        }
    };

    return (
        <ApiCallsContext.Provider value={{ uploadSong }}>
            {children}
        </ApiCallsContext.Provider>
    );
};

// Custom Hook to use API Calls
export const useApiCalls = () => {
    const context = useContext(ApiCallsContext);
    if (!context) {
        throw new Error("useApiCalls must be used within an ApiCallsProvider");
    }
    return context;
};

export default ApiCallsProvider;
