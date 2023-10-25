// import React, { useState, useEffect } from "react";
// import db from "../data/db.json";
// import { Songs, Category, Artist } from "../Types/SongsTypes";
// import { Button, GridSongCard, RecentGrid, ScrollableRowComponent, SongCard } from "../components";
// import { useSongs } from '../context/songContext/songContext';




//  MIRA! NI UNA PUTA PROP! 


//     const { favorites,isFavorite, toggleFavorite } = useSongs()
//     //si no sabes que estoy haciendo aqui, mal vamos 
//     const [songs, setSongs] = useState<Songs[]>([])
//     useEffect(() => {
//         setSongs(db.songData);
//     }, []);

//     const [artists, setArtists] = useState<Artist[]>([])
//     useEffect(() => {
//         setArtists(db.artists);
//         console.log(artists)
//     }, []);

    

//     const [categories, setCategories] = useState<Category[]>([])
//     useEffect(() => {
//         setCategories(db.categories);
//     }, [])

//     //counter para paginacion rudimentario y mucho 




//     //canciones recientes sin guardarlas al usuario ni nada 
//     const [recents, setRecents] = useState<Songs[]>([])


//     const addToRecents = (song: Songs) => {
//         const { id } = song;
//         const newRecents= [...recents];
      
     
//         if (!recents.some((item: Songs) => item.id === id)) {
//             newRecents.unshift(song);
//         setRecents(newRecents);
//         }
//     }
 
//     // Esto va a ser un componente independiente
//     const handleClick = () => {
//         alert("clicked");
//     }

//     return (
//         <>
//             <div className="songList">
                
//                     <ScrollableRowComponent>
//                         {categories.map((category) => (
//                             <Button variant="StyledButtonPill" key={category.id} content={`${category.name}`} onClick={handleClick} />
//                         ))}
//                     </ScrollableRowComponent>
             


//                 <div className="container">
//                     <h1>Song List</h1>
//                     <ScrollableRowComponent>
//                         {songs.slice(0, indexCounter).map((song) => (
//                             <SongCard
//                                 key={song.id}
//                                 song={song}
//                                 toggleFavorite={toggleFavorite}
//                                 isFavorite={isFavorite}
//                                 addToRecents={addToRecents}
//                             />
//                         ))}
//                         <button onClick={loadMoreSongs}>Load More</button>
//                     </ScrollableRowComponent>
//                 </div>
//                 <div style={{ padding: 0 }}>
//                     <h1>Recently Played</h1>
//                     <RecentGrid>
//                         {recents.length === 0 && <h1>No recents yet</h1>}
//                         {recents.map((song) => (
//                             <GridSongCard
//                                 key={song.id}
//                                 song={song}
//                                 toggleFavorite={toggleFavorite}
//                                 isFavorite={isFavorite}
//                                 addToRecents={addToRecents}
//                             />
//                         ))}
//                     </RecentGrid>
//                     <div className="container">
//                         <h1>Favorites</h1>
//                         <ul className="row">
//                             {favorites.length === 0 && <h1>No favorites yet</h1>}
//                             {favorites.map((song) => (
//                                 <SongCard
//                                     key={song.id}
//                                     song={song}
//                                     toggleFavorite={toggleFavorite}
//                                     isFavorite={isFavorite}
//                                     addToRecents={addToRecents}
//                                 />
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </>

//     );
// };


// //esto va a ser el card del grid si se que es CSS, gracias! ;)


// import db from '../data/db.json';
// import { ScrollableRowComponent } from '../components';

// import { Button, RecentGrid } from '../components';
// import { useEffect, useState } from 'react';
// import { Songs } from '../Types/SongsTypes';
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
  

