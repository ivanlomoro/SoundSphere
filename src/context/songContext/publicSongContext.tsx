import { ReactNode, useEffect, useState } from "react";
import { createContext } from "vm";
import { Songs } from "../../Types/SongsTypes";
import axios from 'axios';

const PublicSongContext = createContext(); 

type PublicSongProviderProps = {
    children: ReactNode
};

const PublicSongProvider: React.FC<PublicSongProviderProps> = ({ children }) => {

    const [fetchedSongs, setFetchedSongs] = useState<Songs[]>([]);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get('http://localhost:8080/song/public'); 
                if(response.status === 200) {
                    setFetchedSongs(response.data);
                }
                if(response.status !== 200) {
                    console.error('Failed to fetch songs from the API');
                }
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchSongs();
    }, [])

    return (
        <PublicSongContext.Provider 
        value={{
            fetchedSongs
        }}
        >
            { children }
        </PublicSongContext.Provider>
    );
};

export default PublicSongProvider;