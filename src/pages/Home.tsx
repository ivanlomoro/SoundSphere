import {
  HeaderSection,
  ScrollableRowComponent,
} from "../components";
import GenreButtons from "../components/genresGrid/GenreButtons";
import { useApiCalls } from "../context/songContext/ApiCalls";
import { useInteractions } from "../context/userContext/InteractionContext";
import { useRenderer } from "../hooks/useRenderer";
import { AlbumCard } from "../components/card/AlbumCard";
import { RecentGrid } from '../components/homeContainers/FavoritesGrid';

export const Home = () => {
  // const { publicSongs } = useApiCalls();

  const { albums } = useApiCalls();
  const{favorites, recents} = useInteractions()
  // const { userPlaylists } = useContext(PlaylistContext);
  const { renderSongs: renderRecentsSongs } = useRenderer({
    songs: recents,
    layout: "grid",
  });


  const { renderSongs: renderFavoriteSongs } = useRenderer({
    songs: favorites,
    layout: "card",
  });



  return (
    <>
      <HeaderSection text="SoundSphere" withBackButton={false} />
      {/* <WelcomeUserSection /> */}
      <GenreButtons />

      
      <div> <h2>Favorites Songs</h2>
        <ScrollableRowComponent>
         
           {renderFavoriteSongs()}
       
        </ScrollableRowComponent>
        {recents.length > 0 && (
          <>
            <h3>Recently Listened</h3>
            <RecentGrid>{renderRecentsSongs()}</RecentGrid>
          </>
        )}
        {albums.length > 0 && (
          <>
            <h3>Albums</h3>
            <ScrollableRowComponent>
         
              {albums.map((album) => (
                <li key={album.id}>
                  <AlbumCard album={album} />
                </li>
              ))}
            </ScrollableRowComponent>
          </>
        )}

       


      </div>
    </>
  );
};
