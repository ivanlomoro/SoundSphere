import { BrowserRouter, Routes, Route } from "react-router-dom";
import {LandingPage} from "../pages/";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} />
        <Route index element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  )
}
