// import { createContext, useContext, useState } from 'react';

// const MusicPlayerContext = createContext();
// export function useMusicPlayer() {
//   return useContext(MusicPlayerContext);
// }

// export function MusicPlayerProvider({ children }) {
//   const [currentSong, setCurrentSong] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const playSong = (song) => {
//     setCurrentSong(song);
//     setIsPlaying(true);
//   };

//   const pauseSong = () => {
//     setIsPlaying(false);
//   };

//   return (
//     <MusicPlayerContext.Provider
//       value={{
//         currentSong,
//         isPlaying,
//         playSong,
//         pauseSong,
//       }}
//     >
//       {children}
//     </MusicPlayerContext.Provider>
//   );
// };