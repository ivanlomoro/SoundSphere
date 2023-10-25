import { useContext, useState } from "react"
import { ListSongCard } from "../components/card/ListSongCard"
import { useFavorites } from "../context/FavoriteProvider"
import { Songs } from '../Types/SongsTypes';
import { AuthContext } from "../context/authContext/authContext";
import { HeaderSection } from "../components";



export const FavoriteSongs = () => {
    const { favorites, isFavorite, toggleFavorite } = useFavorites()
    const { user } = useContext(AuthContext)
    const [recents, setRecents] = useState<Songs[]>([])
    
    const addToRecents = (song: Songs) => {
        const { id } = song;
        const newRecents = [...recents];
        if (!recents.some((item: Songs) => item.id === id)) {
            newRecents.unshift(song);
            setRecents(newRecents);
        }
    }

    return (
        <>
            <HeaderSection text="Favorites" />
            <div>
            {
            user
            ? <>  <h1>{user.name} Favorite Songs</h1>
                        <h1> Favorite Songs</h1></>
            : null
            }
                <ul>
                    {favorites.length === 0 && <h1>No favorites yet</h1>}
                    {favorites.map((song) => (
                        <ListSongCard
                            key={song.id}
                            song={song}
                            toggleFavorite={toggleFavorite}
                            isFavorite={isFavorite}
                            addToRecents={addToRecents}
                        />
                    ))}
                </ul>
            </div>
        </>
    )
}