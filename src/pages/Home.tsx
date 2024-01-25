import {
  HeaderSection,
  RecentGrid,
  ScrollableRowComponent,
  WelcomeUserSection,
} from "../components";
import axios from "axios";
import GenreButtons from "../components/genresGrid/GenreButtons";
import { useApiCalls } from "../context/songContext/ApiCalls";
import { useInteractions } from "../context/userContext/InteractionContext";
import { useRenderer } from "../hooks/useRenderer";
import { useContext } from "react";

import { PlaylistContext } from "../context/playlistContext/PlayListContext";
import { NavLink } from "react-router-dom";
import { FAVORITESONGSPAGE } from "../routes/paths";
import { PlaylistCardContainer } from "../components/card/PlaylistCard";

export const Home = () => {
  const { publicSongs } = useApiCalls();
  const { recents, favorites, playlists } = useInteractions();
  const { userPlaylists } = useContext(PlaylistContext);

  const { renderSongs: renderPublicSongs } = useRenderer({
    songs: publicSongs,
    layout: "card",
  });
  const { renderSongs: renderRecentsSongs } = useRenderer({
    songs: recents,
    layout: "grid",
  });
  const { renderSongs: renderFavoriteSongs } = useRenderer({
    songs: favorites,
    layout: "card",
  });

  // const { renderPlaylists: renderPlaylists } = useRenderer({
  //   playlists: userPlaylists,
  //   layout: "card",
  // });

  return (
    <>
      <HeaderSection text="SoundSphere" withBackButton={false} />
      {/* <WelcomeUserSection /> */}
      <GenreButtons />
      <div>
        {/* <h2>Song List</h2> */}
        {/* <ScrollableRowComponent>{renderPublicSongs()}</ScrollableRowComponent> */}
        {recents.length > 0 && (
          <>
            <h3>Recently listended </h3>
            <RecentGrid>{renderRecentsSongs()}</RecentGrid>
          </>
        )}
        {favorites.length > 0 && (
          <>
            <h3>Favorites</h3>
            <ScrollableRowComponent>
              {renderFavoriteSongs()}
            </ScrollableRowComponent>
          </>
        )}
        {/* {favorites.length > 0 && (
          <>
            <h3>Carrussel playlist1</h3>
            <ScrollableRowComponent>
              {renderFavoriteSongs()}
            </ScrollableRowComponent>
          </>
        )} */}
        {/* {playlists.length > 0 && (
          <>
            <h3>Carrussel playlist2</h3>
            <ScrollableRowComponent>{renderPlaylists()}</ScrollableRowComponent>
          </>
        )} */}

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
