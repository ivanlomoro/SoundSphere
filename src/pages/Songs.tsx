import React, { useState, useEffect } from "react";
import db from "../data/db.json";
import { useFavorites } from "../context/FavoriteProvider";
import { Artist } from "../Types/SongsTypes";
import { Button, GridSongCard, RecentGrid, ScrollableRowComponent, SongCard } from "../components";


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

    const { favorites,isFavorite, toggleFavorite } = useFavorites()
    //si no sabes que estoy haciendo aqui, mal vamos 
    const [songs, setSongs] = useState<Songs[]>([])
    useEffect(() => {
        setSongs(db.songData);
    }, []);

    const [artists, setArtists] = useState<Artist[]>([])
    useEffect(() => {
        setArtists(db.artists);
        console.log(artists)
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



    //canciones recientes sin guardarlas al usuario ni nada 
    const [recents, setRecents] = useState<Songs[]>([])


    const addToRecents = (song: Songs) => {
        const { id } = song;
        const newRecents= [...recents];
      
     
        if (!recents.some((item: Songs) => item.id === id)) {
            newRecents.unshift(song);
        setRecents(newRecents);
        }
    }
 
    // Esto va a ser un componente independiente
    const handleClick = () => {
        alert("clicked");
    }
    console.log('init-songs')
    return (
        <>
            <div className="songList">
                
                    <div style={{display:'flex', justifyContent:'space-between', width:'93vw'}}>
                        {categories.map((category) => (
                            <Button variant="StyledButtonPill" key={category.id} content={`${category.name}`} onClick={handleClick} />
                        ))}
                    </div>
             


                <div className="container">
                    <h2>Song List</h2>
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
                    
                    <RecentGrid>
                   {recents.length === 1 && <h2>Your Recently Played</h2>}
                        
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
                     <h2>Favorites</h2>
                    <ScrollableRowComponent>
                 
                       
             
                            {favorites.length === 0 && <h3>No favorites yet</h3>}
                            {favorites.map((song) => (
                                <SongCard
                                    key={song.id}
                                    song={song}
                                    toggleFavorite={toggleFavorite}
                                    isFavorite={isFavorite}
                                    addToRecents={addToRecents}
                                />
                            ))}
                 
                    </ScrollableRowComponent>
                </div>
            </div>
        </>

    );
};


//esto va a ser el card del grid si se que es CSS, gracias! ;)


// {songs.map((song) => (
//     <p key={song.id}>{song.name} by {song.artist}</p>
//     ))}