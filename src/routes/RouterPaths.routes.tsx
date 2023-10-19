import { FC } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { LandingPage, LoginPage, UserPage } from "../pages"
import { HOME, LANDINGPAGE, LOGIN, USERPAGE } from "./paths"



export const RouterPaths: FC= () => {
    return (
        <>
     
            <Routes>
                <Route path= {HOME} element={<Home />} />
                <Route path={LANDINGPAGE} element={<LandingPage/>} />
                <Route path={LOGIN} element={<LoginPage/>} />
                <Route path={USERPAGE} element={<UserPage/>} />
                {/* <Route path="/" element={} /> */}
             
                <Route path="/" element={<Navigate to={HOME} />} />
            </Routes>
     

        </>
    )
}


