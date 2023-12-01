import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home, LandingPage, UserPage, FavoriteSongs, AddMusicPage } from "../pages";
import {
  DISPLAYPAGE,
  HOME,
  LANDINGPAGE,
  USERPAGE,
  FAVORITEPAGE,
  SEARCHPAGE,
  ADDMUSICPAGE,
  MYSONGSPAGE,
  MICHELE
} from "./paths";
import { NavLayout } from "../components/layouts/NavLayout";
import { DisplayPage } from "../pages/DisplayPage";
import { SearchPage } from "../pages/SearchPage";
import MySongsPage from "../pages/MySongsPage"
import PlaylistPage from "../pages/PlaylistPage";

export const RouterPaths: FC = () => {
  return (
    <>
      <Routes>
        <Route element={<NavLayout />}>
          <Route path={HOME} element={<Home />} />
          <Route path={USERPAGE} element={<UserPage />} />
          <Route path={DISPLAYPAGE} element={<DisplayPage />}>
            <Route path=":name" element={<DisplayPage />}></Route>
          </Route>
          <Route path={MICHELE} element={<PlaylistPage />} />
          <Route path={SEARCHPAGE} element={<SearchPage />} />
          <Route path={FAVORITEPAGE} element={<FavoriteSongs />} />
          <Route path={ADDMUSICPAGE} element={<AddMusicPage />} />
          <Route path={MYSONGSPAGE} element={<MySongsPage />} />
        </Route>
        <Route path={LANDINGPAGE} element={<LandingPage />} />
        <Route path="/" element={<Navigate to={HOME} />} />
      </Routes>
    </>
  );
};
