// import React, { createContext, useState, useContext, ReactNode } from 'react';
// import { Artist, Songs } from "../../Types/SongsTypes";
// import useArrayActions from './path-to-useArrayActions'; 



// const UserInteractionProvider: React.FC<UserInteractionProviderProps> = ({ children }) => {
  
//     const [recents, setRecents] = useState<Songs[]>([]);
//     const [favorites, setFavorites] = useState<Songs[]>([]);
//     const [followed, setFollowed] = useState<Artist[]>([]);


//     const handleRecentsAction = useArrayActions(setRecents, recents);
//     const handleFavoritesAction = useArrayActions(setFavorites, favorites);
//     const handleFollowedAction = useArrayActions(setFollowed, followed);
  


//     const itemExists = (arr, id) => arr.some(item => item.id === id);

  
//     const isSelected = (id) => itemExists(selectedSongs, id);
//     const isFavorite = (id) => itemExists(favorites, id);
//     const isFollowed = (id) => itemExists(followed, id);

//     return (
//         <InteractionContext.Provider value={{
//             uploadedSongs,
//             favoriteSongs: favorites,
//             customPlaylists: [],
//             followedArtists: followed,
//             followed,
//             isSelected,
//             selectedSongs,
//             handleRecentsAction,
//             handleFavoritesAction,
//             handleFollowedAction,
//             // ... Add other handlers and values
//         }}>
//             {children}
//         </InteractionContext.Provider>
//     );
// };

// // Exporting the useInteractions hook remains the same
// export default UserInteractionProvider;



// mport { Dispatch, SetStateAction } from 'react';

// // Assuming the types Song and Artist are defined somewhere in your project
// type Item = Song | Artist; // Replace with your actual types
// type Action = 'add' | 'remove' | 'toggle';

// // A generic function to check for item existence in an array
// const itemExists = <T extends Item>(array: T[], itemId: string): boolean => {
//     return array.some(item => item.id === itemId);
// };

// function useArrayActions<T extends Item>(
//     setArray: Dispatch<SetStateAction<T[]>>,
//     array: T[]
// ) {
//     const handleAction = (action: Action, item: T) => {
//         switch (action) {
//             case 'add':
//                 if (!itemExists(array, item.id)) {
//                     setArray(prev => [item, ...prev]);
//                 }
//                 break;
//             case 'remove':
//                 setArray(current => current.filter(i => i.id !== item.id));
//                 break;
//             case 'toggle':
//                 itemExists(array, item.id)
//                     ? setArray(current => current.filter(i => i.id !== item.id))
//                     : setArray(prev => [item, ...prev]);
//                 break;
//             default:
//                 throw new Error('Unsupported action');
//         }
//     };

//     return handleAction;
// }

// export default useArrayActions;
// This hook:

// Takes in the setter function for the state(setArray) and the current state array.
// Defines handleAction function that performs the add, remove, or toggle action based on the provided action parameter.
// Uses a generic itemExists function to check if an item is already in the array.This function relies on each item having an id property.
// In your component, you would use it like this:

// tsx
// Copy code
// import useArrayActions from './useArrayActions'; // Adjust the import path as needed

// const YourComponent = () => {
//     const [recents, setRecents] = useState<Songs[]>([]);
//     const [favorites, setFavorites] = useState<Songs[]>([]);
//     // ... other state variables

//     const handleRecentsAction = useArrayActions(setRecents, recents);
//     const handleFavoritesAction = useArrayActions(setFavorites, favorites);
//     // ... and so on for other arrays

//     // Example usage
//     const someSong: Songs = {/* ... */ };

//     // Add a song to recents
//     handleRecentsAction('add', someSong);

//     // Toggle a song in favorites
//     handleFavoritesAction('toggle', someSong);

//     // ... rest of your component
// }