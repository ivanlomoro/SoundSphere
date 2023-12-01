import { useContext, useEffect, useState } from "react";
import { RecentGrid } from "../components/homeContainers/FavoritesGrid"
import { useRenderer } from "../hooks/useRenderer";
import { useSongs } from "../context/songContext/songContext"
import { UserContext } from "../context/userContext/UserContext";
import { Link } from "react-router-dom";
import { ADDMUSICPAGE } from '../routes/paths';


const MySongsPage = () => {
    const { mySongs, getMySongs, isModifiedSong } = useSongs();
    const [isLoading, setLoading] = useState<boolean>(true)
    const { renderSongs } = useRenderer({ mySongs, layout: "grid" });
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
    }, [isModifiedSong]);

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