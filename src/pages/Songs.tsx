import React, { useState, useEffect } from "react";
import db from "../data/db.json";
import { useFavorites } from "../context/FavoriteProvider";
import { Artists } from '../Types/SongsTypes';
import { Button, GridSongCard, RecentGrid, ScrollableRowComponent, SongCard } from "../components";
import { ArtistCard } from "../components/card/ArtistCard";


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

    const { favorites,isFavorite, toggleFavorite, isFollowed, toggleFollowed } = useFavorites()
    //si no sabes que estoy haciendo aqui, mal vamos 
    const [songs, setSongs] = useState<Songs[]>([])
    useEffect(() => {
        setSongs(db.songData);
    }, []);

    const [artists, setArtists] = useState<Artists[]>([])
    useEffect(() => {
        setArtists(db.artistsData);
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
   
import { RecentGrid, ScrollableRowComponent } from '../components';
import { SongCard } from '../components/card/FinalCardForMerge';
import { useSongs } from '../context/songContext/songContext';
export const SongList = () => {
    const { songs, isFavorite, toggleFavorite, addToRecents, favorites, recents } = useSongs();

    return (
      <div> 
        
         <h1>Song List</h1>
        <ScrollableRowComponent>      
        {songs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            addToRecents={addToRecents}
          />
        ))}</ScrollableRowComponent>
         <h1>Recently Played</h1>
        <RecentGrid>      
        {recents.map((song) => (
          <SongCard
          variant='grid'
            key={song.id}
            song={song}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            addToRecents={addToRecents}
          />
        ))}</RecentGrid>
         <h1>Favorites</h1>
        <ScrollableRowComponent>      
        {favorites.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            addToRecents={addToRecents}
          />
        ))}</ScrollableRowComponent>
        {/* Add more sections for recents and favorites similarly */}
      </div>
    );
  };
  

