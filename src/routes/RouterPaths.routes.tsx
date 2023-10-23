import { FC } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { DisplayPage, Home, LandingPage, UserPage } from "../pages"
import { DISPLAYPAGE, HOME, LANDINGPAGE, USERPAGE } from "./paths"




export const RouterPaths: FC = () => {
    return (
        <>

            <Routes>
                <Route path={HOME} element={<Home />} />
                <Route path={LANDINGPAGE} element={<LandingPage />} />
                <Route path={USERPAGE} element={<UserPage />} />
                <Route path={DISPLAYPAGE} element={<DisplayPage />} />


                <Route path="/" element={<Navigate to={HOME} />} />
            </Routes>


        </>
    )
}


