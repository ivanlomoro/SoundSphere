import { useContext, useEffect, useState } from "react";
import { RecentGrid } from "../components/homeContainers/FavoritesGrid"
import { useRenderer } from "../hooks/useRenderer";
import { useSongs } from "../context/songContext/songContext"
import { UserContext } from "../context/userContext/UserContext";
import { Link } from "react-router-dom";
import { ADDMUSICPAGE } from '../routes/paths';


const MySongsPage = () => {
    const { mySongs, getMySongs, isFavorite, toggleFavorite, addToRecents, isDeletedSong } = useSongs();
    const [isLoading, setLoading] = useState<boolean>(true)
    const { renderSongs } = useRenderer({ mySongs, toggleFavorite, isFavorite, addToRecents, layout: "grid", isMySong:true });
    const { user } = useContext(UserContext)

    useEffect(() => {
        const loadData = async () => {
            try {
                await getMySongs(user);
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        };
        loadData();
        console.log("Has pasado por el useEffect de MysongPage")
    }, [isDeletedSong]);

    return (
        <>
            <div>
                <h2>My Songs</h2>
                {isLoading ? <p>Loading...</p> :
                    (mySongs.length > 0) ?
                        <RecentGrid>
                            {renderSongs()}
                        </RecentGrid>
                        : <p>You didn`t upload any songs! <Link to= {ADDMUSICPAGE} > upload song</Link> </p>
                }
            </div>
        </>
    )
}

export default MySongsPage