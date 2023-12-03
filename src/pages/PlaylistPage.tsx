
// import { useInteractions } from '../context/userContext/InteractionContext'
// import { useRenderer } from '../hooks/useRenderer';
// import { HeaderSection } from '../components';
// import { useParams } from 'react-router-dom';

//  const PlaylistPage = () => {
//    const {selectedPlaylists} = useInteractions();
//    const { renderPlaylists: renderSlectedPlaylist } = useRenderer({ lists: selectedPlaylists,  layout: "fullscreen" });
//    const { playlistName } = useParams<{ playlistName: string }>()
//   return (
//     <>
//           <HeaderSection text="Playlists" />
//           <ul>
//             <h2> Playlists</h2>
//         {renderSlectedPlaylist() }
//           </ul>
//     </>
//   );
// };

// export default PlaylistPage

import { useInteractions } from '../context/userContext/InteractionContext'
import { useRenderer } from '../hooks/useRenderer';
import { HeaderSection } from '../components';


const PlaylistPage = () => {
  const { playlists } = useInteractions();
  const { renderPlaylists: renderSlectedPlaylist } = useRenderer({ playlists: playlists, layout: "list" });

  return (
    <>
      <HeaderSection text="Playlists" />
      <ul>
        <h2> Playlists</h2>
        {renderSlectedPlaylist()}
      </ul>
    </>
  );
};

export default PlaylistPage