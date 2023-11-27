import React, { createContext, ReactNode, useContext } from "react";
import axios from "axios";


interface ApiCallContextType {
uploadSong: (songData: SongUploadData) => void;
}
interface SongUploadData {
    name: string;
    artist: string;
    genre: string;
    url: string;
    thumbnail: string;
   
}
const ApiCallsContext = createContext<ApiCallContextType | null>(null);
const baseUrl = `http://localhost:8080`
type ProviderProps = {
    children: ReactNode;
};

const ApiCallsProvider: React.FC<ProviderProps> = ({ children }) => {
 const userID = "6562012b45ac8690c4290edc"
 const encodedID = encodeURIComponent(userID)    
 const requestUrl = `"${baseUrl}"song/"${encodedID}"`    
const name = "Wonder Wall"
 const artist = "Oasis"
 const genre = "Rock"
 const url = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
 const thumbnail = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
 
    const uploadSong = async ( ) => {
        const songData: SongUploadData = {
            name,
            artist,
            genre,
            url,
            thumbnail,
        } 
        
        
        try {
            const response = await axios.post(requestUrl, songData, {

            });
            if (response) { console.log('Song uploaded successfully!', response.data) }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Failed to upload song:', error.response.data.message || 'Failed to upload song');
            } else {
                console.error('Failed to upload song:');
            }
        }
    };
    return (
        <ApiCallsContext.Provider value={{ uploadSong }}>
            {children}
        </ApiCallsContext.Provider>
    );
};

export const useApiCalls = () => {
    const context = useContext(ApiCallsContext);
    if (!context) {
        throw new Error("useApiCalls must be used within a SongsProvider");
    }
    return context;
};

export default ApiCallsProvider;