import { FC } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { LandingPage, UserPage } from "../pages"
import { DISPLAYPAGE, HOME, LANDINGPAGE, USERPAGE } from "./paths"
import { NavLayout } from "../components/layouts/NavLayout"
import { DisplayPage } from "../pages/DisplayPage"



export const RouterPaths: FC = () => {
    return (
        <>

            <Routes>
                <Route element={<NavLayout />}>
                    <Route path= {HOME} element={<Home />} />
                    <Route path={USERPAGE} element={<UserPage/>} />
                    <Route path={DISPLAYPAGE} element={<DisplayPage />} >
                        <Route path=":name" element={<DisplayPage />} ></Route>
                    </Route>
                </Route>
                <Route path={LANDINGPAGE} element={<LandingPage/>} />    
                <Route path="/" element={<Navigate to={HOME} />} />
            </Routes>


        </>
    )
}


