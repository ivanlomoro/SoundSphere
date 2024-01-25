import {
  HeaderSection,
  ScrollableRowComponent,
} from "../components";
import GenreButtons from "../components/genresGrid/GenreButtons";
import { useApiCalls } from "../context/songContext/ApiCalls";
// import { useApiCalls } from "../context/songContext/ApiCalls";
import { useInteractions } from "../context/userContext/InteractionContext";
import { useRenderer } from "../hooks/useRenderer";
// import { useContext } from "react";
// import { PlaylistContext } from "../context/playlistContext/PlayListContext";
import { ArtistCard } from "../components/card/ArtistCard";
import { AlbumCard } from "../components/card/AlbumCard";

export const Home = () => {
  // const { publicSongs } = useApiCalls();
  const { playlists } = useInteractions();
  const { artists } = useApiCalls();
  const { publicSongs } = useApiCalls();
  const { albums } = useApiCalls();
  // const { userPlaylists } = useContext(PlaylistContext);
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
  // });
const{ renderSongs: renderPublicSongs } = useRenderer({
    songs: publicSongs,
    layout: "card",
})
  const { renderPlaylists: renderPlaylists } = useRenderer({
    playlists: playlists,
    layout: "card",
  });

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
                <li key={album.id}>
                  <AlbumCard album={album} />
                </li>
              ))}
            </ScrollableRowComponent>
          </>
        )}

        {playlists.length > 0 && (
          <>
            <h3></h3>

            <ScrollableRowComponent>{renderPublicSongs()}</ScrollableRowComponent>
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
