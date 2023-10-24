import { FC } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { DisplayPage, Home, LandingPage, UserPage, FavoriteSongs } from "../pages"
import { DISPLAYPAGE, HOME, LANDINGPAGE, USERPAGE, FAVORITEPAGE } from "./paths"
import { NavLayout } from "../components/layouts/NavLayout"




export const RouterPaths: FC = () => {
    return (
        <>

            <Routes>
                <Route element={<NavLayout />}>
                    <Route path= {HOME} element={<Home />} />
                    <Route path={USERPAGE} element={<UserPage/>} />
                    <Route path={DISPLAYPAGE} element={<DisplayPage />} />
                    <Route path={FAVORITEPAGE} element={<FavoriteSongs />} />
                </Route>
                <Route path={LANDINGPAGE} element={<LandingPage/>} />    
                <Route path="/" element={<Navigate to={HOME} />} />
            </Routes>


        </>
    )
}


