import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  Home,
  LandingPage,
  UserPage,
  FavoriteSongs,
  AddMusicPage,
} from "../pages";

import {
  HOME,
  LANDINGPAGE,
  USERPAGE,
  FAVORITEPAGE,
  SEARCHPAGE,
  ADDMUSICPAGE,
  MYSONGSPAGE,
  PLAYLISTALL,
  GENRE,
  FAVORITESONGSPAGE,
} from "./paths";
import { NavLayout } from "../components/layouts/NavLayout";
import { SearchPage } from "../pages/SearchPage";
import MySongsPage from "../pages/MySongsPage";
import PlaylistPage from "../pages/PlaylistPage";
import { PlayerLayout } from "../components/layouts/PlayerLayout";
import GenrePage from "../pages/GenrePage";
import FavoritePlaylist from "../pages/FavoritePlaylistPage";
import PlaylistDisplayPage from "../pages/playlistDisplayPage";
import AlbumDisplayPage from "../pages/albumDisplayPage";
import ArtistDisplayPage from "../pages/artistDisplayPage";
import NotFoundPage from "../pages/NotFoundPage";

export const RouterPaths: FC = () => {
  return (
    <>
      <Routes>
        <Route element={<PlayerLayout />}>
          <Route path={HOME} element={<Home />} />
          <Route path={USERPAGE} element={<UserPage />} />
          <Route path={SEARCHPAGE} element={<SearchPage />} />
          <Route path={FAVORITEPAGE} element={<FavoritePlaylist />} />
          <Route path={FAVORITESONGSPAGE} element={<FavoriteSongs />} />
          <Route path={MYSONGSPAGE} element={<MySongsPage />} />
          <Route path={PLAYLISTALL} element={<PlaylistPage />} />
          <Route path={GENRE} element={<GenrePage />} />
          <Route
            path="/playlist/:playlistId"
            element={<PlaylistDisplayPage />}
          />
          <Route path="/artist/:artistId" element={<ArtistDisplayPage />} />
          <Route path="/album/:albumId" element={<AlbumDisplayPage />} />
        </Route>
        <Route element={<NavLayout />}>
          <Route path={ADDMUSICPAGE} element={<AddMusicPage />} />
        </Route>
        <Route path={LANDINGPAGE} element={<LandingPage />} />
        <Route path="/" element={<Navigate to={HOME} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
