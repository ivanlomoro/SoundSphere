import { FC } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { LandingPage, UserPage } from "../pages"
import { DISPLAYPAGE, HOME, LANDINGPAGE, USERPAGE } from "./paths"
import { ButtonTest } from "../pages/ButtonTest"
import { DisplayPage } from "../pages/DisplayPage"



export const RouterPaths: FC = () => {
    return (
        <>

            <Routes>
                <Route path={HOME} element={<Home />} />
                <Route path={LANDINGPAGE} element={<LandingPage />} />
                <Route path={USERPAGE} element={<UserPage />} />
                <Route path={DISPLAYPAGE} element={<DisplayPage />} />
                <Route path="/button" element={<ButtonTest />} />


                <Route path="/" element={<Navigate to={HOME} />} />
            </Routes>


        </>
    )
}


