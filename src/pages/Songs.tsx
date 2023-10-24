import React, { useState, useEffect } from "react";
import db from "../data/db.json";
import "./styles.css";
import { SongCard } from "../components/card/SongCard";
import { Button } from "../components/button/Button";
import { RecentGrid } from "../components/homeContainers/FavoritesGrid";
import { ScrollableRowComponent } from "../components/homeContainers/ScrollableRow";
import { GridSongCard } from "../components/card/GridCard";


//esto lo voy a poner en el types cuando se hara el fetch
export type Songs = {
    id: number;
    name: string;
    artist: string;
    url: string;
    thumbnail: string;
    genre: string;
    liked: boolean;
}
type Category = {
    name: string;
    id: number;
}


//  MIRA! NI UNA PUTA PROP! 
export const SongList: React.FC = () => {


    //si no sabes que estoy haciendo aqui, mal vamos 
    const [songs, setSongs] = useState<Songs[]>([])
    useEffect(() => {
        setSongs(db.songData);
    }, []);

    const [categories, setCategories] = useState<Category[]>([])
    useEffect(() => {
        setCategories(db.categories);
    }, [])

    //counter para paginacion rudimentario y mucho 
    const [indexCounter, setIndexCounter] = useState(4); //usado metodo .slice, no mira el index
    const loadMoreSongs = () => {
        setIndexCounter(prevIndex => prevIndex + 4)
        if (indexCounter > songs.length)
            return <h1>No more songs to load</h1>
    }

    //canciones favoritas sin guardarlas al usuario ni nada 
    const [favorites, setFavorites] = useState<Songs[]>([])
    function isFavorite(id: number) {
        return !!favorites.some((song) => song.id === id);
    }

    const addToFavorites = (song: Songs) => {
        const { id } = song;
        if (!favorites.some((item: Songs) => item.id === id)) {
            setFavorites([...favorites, song]);
        }
    }

    const removeFromFavorites = (id: number) => {
        setFavorites((currentFavorites) =>
            currentFavorites.filter((item) => item.id !== id)
        );
    }

    const toggleFavorite = (song: Songs) => {
        if (isFavorite(song.id)) {
            removeFromFavorites(song.id);
        } else {
            addToFavorites(song);
        }
    }

    //canciones recientes sin guardarlas al usuario ni nada 
    const [recents, setRecents] = useState<Songs[]>([])


    const addToRecents = (song: Songs) => {
        const { id } = song;
        if (!recents.some((item: Songs) => item.id === id)) {
            setRecents([...recents, song]);
        }
    }

    // Esto va a ser un componente independiente
    const handleClick = () => {
        alert("clicked");
    }

    return (
        <>
            <div className="songList">
                <div className="categoryButtonWrapper">
                    <ul className="row">
                        {categories.map((category) => (
                            <Button variant="StyledButtonPill" key={category.id} content={`${category.name}`} onClick={handleClick} />
                        ))}
                    </ul>
                </div>


                <div className="container">
                    <h1>Song List</h1>
                    <ScrollableRowComponent>
                        {songs.slice(0, indexCounter).map((song) => (
                            <SongCard
                                key={song.id}
                                song={song}
                                toggleFavorite={toggleFavorite}
                                isFavorite={isFavorite}
                                addToRecents={addToRecents}
                            />
                        ))}
                        <button onClick={loadMoreSongs}>Load More</button>
                    </ScrollableRowComponent>
                </div>
                <div style={{ padding: 0 }}>
                    <h1>Recently Played</h1>
                    <RecentGrid>
                        {recents.length === 0 && <h1>No recents yet</h1>}
                        {recents.map((song) => (
                            <GridSongCard
                                key={song.id}
                                song={song}
                                toggleFavorite={toggleFavorite}
                                isFavorite={isFavorite}
                                addToRecents={addToRecents}
                            />
                        ))}
                    </RecentGrid>
                    <div className="container">
                        <h1>Favorites</h1>
                        <ul className="row">
                            {favorites.length === 0 && <h1>No favorites yet</h1>}
                            {favorites.map((song) => (
                                <SongCard
                                    key={song.id}
                                    song={song}
                                    toggleFavorite={toggleFavorite}
                                    isFavorite={isFavorite}
                                    addToRecents={addToRecents}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>

    );
};


//esto va a ser el card del grid si se que es CSS, gracias! ;)


// {songs.map((song) => (
//     <p key={song.id}>{song.name} by {song.artist}</p>
//     ))}