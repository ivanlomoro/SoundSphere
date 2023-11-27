import { useContext, useEffect, useState } from "react";
import { RecentGrid } from "../components/homeContainers/FavoritesGrid"
import { useMagic } from "../hooks/useMagic";
import { useSongs } from "../context/songContext/songContext"
import { UserContext } from "../context/userContext/UserContext";


const MySongsPage = () => {
    const { getMySongs, songs } = useSongs()
    const [isLoading, setLoading] = useState<boolean>(true)
    const { renderSongs } = useMagic({ songs, layout: "grid" });
    const {user} = useContext(UserContext)
    
    useEffect(() => {
        const loadData = async () => {
            console.log("ENTRA O NOOOOOOO")
            try {
                await getMySongs(user);
                console.log("Muestra getMySongs:", getMySongs)
            }catch (error){
                console.log(error)
            } finally {
                setTimeout(() => {
                    setLoading(false);
                    console.log("Estas en el setLoading")
                }, 1000);
            }
        };
        loadData();
    }, []);

    return (
        <>
            <div>
                <h2>My Songs</h2>
                {isLoading ? <p>Loading...</p> :
                    (songs.length > 0)
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