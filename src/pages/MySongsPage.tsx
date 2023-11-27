import { useContext, useEffect, useState } from "react";
import { RecentGrid } from "../components/homeContainers/FavoritesGrid"
import { useMagic } from "../hooks/useMagic";
import { useSongs } from "../context/songContext/songContext"
import { UserContext } from "../context/userContext/UserContext";


const MySongsPage = () => {
    const { mySongs, songs, getMySongs, isFavorite, toggleFavorite, addToRecents } = useSongs();
    const [isLoading, setLoading] = useState<boolean>(true)
    const { renderSongs } = useMagic({ songs, toggleFavorite, isFavorite, addToRecents, layout: "card" });
    const { user } = useContext(UserContext)

    useEffect(() => {
        const loadData = async () => {
            console.log("ENTRA O NOOOOOOO")
            try {
                await getMySongs(user);
                console.log("Muestra getMySongs:", getMySongs)
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
            console.log("Estas en el setLoading")
        };
        loadData();
        console.log("MySongs", mySongs)
    }, []);

    return (
        <>
            <div>
                <h2>My Songs</h2>
                {isLoading ? <p>Loading...</p> :
                    (mySongs.length > 0) //mysongs
                     ?
                    <RecentGrid>
                        {renderSongs()}
                    </RecentGrid>
                      : <p>You don´t have upload songs. </p>
                }
            </div>
        </>
    )
}

export default MySongsPage