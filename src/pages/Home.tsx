import { HeaderSection } from "../components/header/Header";
import { ScrollableRowComponent } from "../components/homeContainers/ScrollableRow";
import GenreButtons from "../components/genresGrid/GenreButtons";
import { useApiCalls } from "../context/songContext/ApiCalls";
import { useInteractions } from "../context/userContext/InteractionContext";
import { useRenderer } from "../hooks/useRenderer";
import { ArtistCard } from "../components/card/ArtistCard";
import { AlbumCard } from "../components/card/AlbumCard";
import { RecentGrid } from "../components/homeContainers/FavoritesGrid";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Home = () => {
  const { recents, favorites } = useInteractions();
  const { albums, artists } = useApiCalls();

  const favoritesToRender = favorites.slice(
    favorites.length - 6,
    favorites.length
  );

  const { renderSongs: renderRecentsSongs } = useRenderer({
    songs: recents,
    layout: "grid",
  });

  const { renderSongs: renderFavoriteSongs } = useRenderer({
    songs: favoritesToRender,
    layout: "grid",
  });

  const StyledLinkContainer = styled.div`
    margin-inline: auto;
    margin-top: var(--space-sm);
    width: fit-content;
    text-decoration: underline;
    cursor: pointer;
    padding: 1em 1.5em;
  `;

  return (
    <>
      <HeaderSection text="SoundSphere" withBackButton={false} />
      <GenreButtons />
      {recents.length > 0 && (
        <>
          <h3>Recent listened</h3>
          <RecentGrid>{renderRecentsSongs()}</RecentGrid>
        </>
      )}
      {favorites.length > 0 && (
        <>
          <h3>Favorites</h3>
          <RecentGrid>{renderFavoriteSongs()}</RecentGrid>
          <StyledLinkContainer>
            <Link to="/favoriteSongs">
              <span>View More</span>
            </Link>
          </StyledLinkContainer>
        </>
      )}
      {artists.length > 0 && (
        <>
          <h3>Artists</h3>
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
