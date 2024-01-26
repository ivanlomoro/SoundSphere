import {
  HeaderSection,
  ScrollableRowComponent,
} from "../components";
import GenreButtons from "../components/genresGrid/GenreButtons";
import { useApiCalls } from "../context/songContext/ApiCalls";
// import { useApiCalls } from "../context/songContext/ApiCalls";

// import { useContext } from "react";
// import { PlaylistContext } from "../context/playlistContext/PlayListContext";
import { ArtistCard } from "../components/card/ArtistCard";
import { AlbumCard } from "../components/card/AlbumCard";


export const Home = () => {
  // const { publicSongs } = useApiCalls();
  const { albums, artists, publicSongs } = useApiCalls();
  console.log('albums', albums, 'artists',
    artists, 'publicSongs', publicSongs)

  // const { renderSongs: renderRecentsSongs } = useRenderer({
  //   songs: recents,
  //   layout: "grid",
  // });
  // const { renderSongs: renderFavoriteSongs } = useRenderer({
  //   songs: publicSongs,
  //   layout: "grid",
  // });

  // const { renderSongs: renderFavoriteSongs } = useRenderer({
  //   songs: favorites,
  //   layout: "card",
  


  return (
    <>
      <HeaderSection text="SoundSphere" withBackButton={false} />
      {/* <WelcomeUserSection /> */}
      <GenreButtons />

      <h3>artists</h3>
      <div>
        <ScrollableRowComponent>

          {/* <h2>Song List</h2> */}
          {/* <ScrollableRowComponent>{renderPublicSongs()}</ScrollableRowComponent> */}
          {artists.length > 0 && (
            <>
              {artists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </>
          )}
        </ScrollableRowComponent>
        {/* {publicSongs.length > 0 && (
          <>
            <h3>songs</h3>
            <RecentGrid>{renderFavoriteSongs()}</RecentGrid>
          </>
        )} */}
        {albums.length > 0 && (
          <>
            <h3>Albums</h3>
            <ScrollableRowComponent>
              {" "}
              {albums.map((album) => (
                <div key={album.id}>
                  <AlbumCard album={album} />
                </div>
              ))}
            </ScrollableRowComponent>
          </>
        )}

     

        {/* // Quiero hardcodear las playlists */}
        {/* {playlists.length > 0 && (
          <>
            <h2>Playlist</h2>
            <ScrollableRowComponent>{renderPlaylists()}</ScrollableRowComponent>
          </>
        )} */}
      </div>
    </>
  );
};