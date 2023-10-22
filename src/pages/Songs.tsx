import React, { useState, useEffect } from "react";
import db from "../data/db.json";
import "./styles.css";
import { Button } from "../components/button/Button";



//esto lo voy a poner en el types cuando se hara el fetch
type Songs = {
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
            return <h1>No moxre songs to load</h1>
    }

    //canciones favoritas sin guardarlas al usuario ni nada 
    const [favorites, setFavorites] = useState<Songs[]>([])
    function isFavorite(id: number) {
        return !!favorites.some((song) => song.id === id);
    }

    function addToFavorites(song: Songs) {
        const { id } = song;
        if (!favorites.some((item: Songs) => item.id === id)) {
            setFavorites([...favorites, song]);
        }
    }

    function removeFromFavorites(id: number) {
        setFavorites((currentFavorites) =>
            currentFavorites.filter((item) => item.id !== id)
        );
    }

    function toggleFavorite(song: Songs) {
        if (isFavorite(song.id)) {
            removeFromFavorites(song.id);
        } else {
            addToFavorites(song);
        }
    }

    //canciones recientes sin guardarlas al usuario ni nada 
    const [recents, setRecents] = useState<Songs[]>([])


    function addToRecents(song: Songs) {
        const { id } = song;
        if (!recents.some((item: Songs) => item.id === id)) {
            setRecents([...favorites, song]);
        }
    }

    // Esto va a ser un componente independiente
    type CardProps = {
        song: Songs;
    };

    const Card: React.FC<CardProps> = ({ song }) => {
        return (
            <li className="card">
                <img className="card-img" src={song.thumbnail} alt={song.name} />
                <p className="card-description">{song.name} by {song.artist}</p>
                <button onClick={() => toggleFavorite(song)}>{/* esto va a ser un componente independiente */}
                    {isFavorite(song.id) ? "❤️" : "♡"}
                </button>
                <Button variant="StyledButtonPlay" onClick={() => addToRecents(song)} text="play" />
            </li>
        );
    };



    return (


        <div className="songList">
            <div className="container">
                <h1> Recently Played</h1>{/* esto va a ser un componente independiente */}
                <ul className="row">
                    {recents.length === 0 && <h1>No recents yet</h1>}
                    {recents.map((song) => (
                        <Card key={song.id} song={song} />
                    ))}
                </ul>
                <h1>Favorites</h1> {/* esto va a ser un componente independiente */}
                <ul className="row">
                    {favorites.length === 0 && <h1>No favorites yet</h1>}
                    {favorites.map((song) => (
                        <Card key={song.id} song={song} />

                    ))}
                </ul></div>
            <div className="container">
                <h1>Song List</h1>
                <ul className="row">
                    {songs.slice(0, indexCounter).map((song) => (
                        <Card key={song.id} song={song} />
                    ))}
                    <button onClick={loadMoreSongs}>Load More</button>
                </ul>
            </div>
        </div>


    )



}


//esto va a ser el card del grid si se que es CSS, gracias! ;)


// {songs.map((song) => (
//     <p key={song.id}>{song.name} by {song.artist}</p>
//     ))}