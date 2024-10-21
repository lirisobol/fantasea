import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Draft } from "../pages/Draft"
import { MyFPL } from "../pages/MyFPL"

export const Routing = ():JSX.Element => {
    return (
        <Routes>
            <Route path="/"  element={<Home />} />
            <Route path="/draft" element={<Draft />} />
            <Route path="/myfpl" element={<MyFPL />} />
        </Routes>
    )
}