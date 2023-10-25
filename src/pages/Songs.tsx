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
  

