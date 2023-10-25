import React, { useState, useEffect } from "react";
import db from "../data/db.json";
import { useFavorites } from "../context/FavoriteProvider";
import { Artist } from "../Types/SongsTypes";
import { Button, GridSongCard, RecentGrid, ScrollableRowComponent, SongCard } from "../components";
import { AiOutlineArrowRight } from "react-icons/ai";
import styled from "styled-components";


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

const StyledButton = styled.button`
    background-color: #282828;
    border: none;
    color: var(--clr-text-primary);
    border-radius: 10px;
    height: fit-content;
    padding-block: 1rem;
    padding-inline: 1rem;
    margin-block: auto;
`


export const SongList: React.FC = () => {

    const { favorites,isFavorite, toggleFavorite } = useFavorites()
    const [songs, setSongs] = useState<Songs[]>([])
    useEffect(() => {
        setSongs(db.songData);
    }, []);

    const [artists, setArtists] = useState<Artist[]>([])
    useEffect(() => {
        setArtists(db.artists);
    }, []);

    

    const [categories, setCategories] = useState<Category[]>([])
    useEffect(() => {
        setCategories(db.categories);
    }, [])

    const [indexCounter, setIndexCounter] = useState(4);
    const loadMoreSongs = () => {
        setIndexCounter(prevIndex => prevIndex + 4)
        if (indexCounter > songs.length)
            return <h1>No more songs to load</h1>
    }



    const [recents, setRecents] = useState<Songs[]>([])


    const addToRecents = (song: Songs) => {
        const { id } = song;
        const newRecents= [...recents];
      
     
        if (!recents.some((item: Songs) => item.id === id)) {
            newRecents.unshift(song);
        setRecents(newRecents);
        }
    }
 
    const handleClick = () => {
        alert("clicked");
    }
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
                        <StyledButton onClick={loadMoreSongs}><AiOutlineArrowRight /></StyledButton>
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


