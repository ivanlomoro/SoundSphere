import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios';
import getData from '../../api/getApi';
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from '../userContext/UserContext';


const apiUrl = import.meta.env.VITE_AUTH0_AUDIENCE;

type GenreType = {
    id: string,
    name: string
}

export type GenreStateProps = {
    apiGenres: GenreType[];
    // apiError: boolean
    getAllGenres: () => void
}


export const GenreContext = createContext<GenreStateProps>({
    apiGenres: [],
    // apiError: true,
    getAllGenres: () => {}
})

const GenreProvider: FC<PropsWithChildren> = ({ children }) => {
    const genreUrl = `genre`
    const [apiGenres, setApiGenres] = useState<GenreType[]>([])
    // const [apiError, setApiError] = useState<boolean>(true)
    const { getAccessTokenSilently: getToken, isAuthenticated } = useAuth0();
    const { user } = useContext(UserContext);


    useEffect(() => {
        if (user) {
            getAllGenres();
            console.log("Genres:", apiGenres)
        }
    }, [isAuthenticated, user]);

    const getAllGenres = async () => {
        const response: AxiosResponse["data"] = await getData(genreUrl, getToken);
        setApiGenres(response.userData);
    };

    return (
        <GenreContext.Provider
            value={{ 
                apiGenres,
                getAllGenres
             }}
        >
            {children}
        </GenreContext.Provider>
    )
}

export const useGenres = () => {
    const context = useContext(GenreContext);
    if (!context) {
        throw new Error("useGenres must be used within an GenreProvider");
    }
    return context;
};

export default GenreProvider