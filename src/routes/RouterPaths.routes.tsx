import { FC } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { LandingPage, LoginPage, UserPage } from "../pages"



export const RouterPaths: FC= () => {
    return (
        <>
     
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/landingPage" element={<LandingPage/>} />
                <Route path="/loginPage" element={<LoginPage/>} />
                <Route path="/userPage" element={<UserPage/>} />
                {/* <Route path="/" element={} /> */}             
                <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
     

        </>
    )
}


