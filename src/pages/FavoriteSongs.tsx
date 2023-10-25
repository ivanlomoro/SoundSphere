import React from 'react';
// import { SongCard } from '../components/card/FinalCardForMerge';// adjust the path accordingly
import { useSongs } from '../context/songContext/songContext'; // adjust the path accordingly

export const FavoritesSongs: React.FC = () => {
    const { favorites, renderListSongs } = useSongs();

    return (
        <div>
            <h2>Your Favorites</h2>
            {renderListSongs(favorites)}
        </div>
    );
};

