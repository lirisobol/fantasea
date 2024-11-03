import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { MyFPL } from "../pages/MyFPL"

export const Routing = ():JSX.Element => {
    return (
        <Routes>
            <Route path="/"  element={<Home />} />
            <Route path="/myfpl" element={<MyFPL />} />
        </Routes>
    )
}