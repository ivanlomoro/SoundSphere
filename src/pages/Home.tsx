import { HeaderSection, ScrollableRowComponent } from "../components";
import GenreButtons from "../components/genresGrid/GenreButtons";
import { useApiCalls } from "../context/songContext/ApiCalls";
// import { useApiCalls } from "../context/songContext/ApiCalls";
import { useInteractions } from "../context/userContext/InteractionContext";
import { useRenderer } from "../hooks/useRenderer";
// import { useContext } from "react";
// import { PlaylistContext } from "../context/playlistContext/PlayListContext";
import { ArtistCard } from "../components/card/ArtistCard";
import { AlbumCard } from "../components/card/AlbumCard";
import { RecentGrid } from "../components";

export const Home = () => {
  const { recents, favorites } = useInteractions();
  const { albums, artists, publicSongs } = useApiCalls();
  console.log("albums", albums, "artists", artists, "publicSongs", publicSongs);

  const { renderSongs: renderRecentsSongs } = useRenderer({
    songs: recents,
    layout: "grid",
  });
  // const { renderSongs: renderFavoriteSongs } = useRenderer({
  //   songs: publicSongs,
  //   layout: "grid",
  // });

  const { renderSongs: renderFavoriteSongs } = useRenderer({
    songs: favorites,
    layout: "card",
  });
  return (
    <>
      <HeaderSection text="SoundSphere" withBackButton={false} />
      {/* <WelcomeUserSection /> */}
      <GenreButtons />
      {recents.length > 0 && (
        <>
          <h3>Recently Listened</h3>

          <RecentGrid>{renderFavoriteSongs()}</RecentGrid>
        </>
      )}

      {artists.length > 0 && (
        <>
          <h3>artists</h3>
          <ScrollableRowComponent>
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}{" "}
          </ScrollableRowComponent>
        </>
      )}

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
    </>
  );
};
