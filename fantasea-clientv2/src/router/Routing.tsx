import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { MyFPL } from "../pages/MyFPL"
import { Draft } from "../pages/Draft"

export const Routing = ():JSX.Element => {
    return (
        <Routes>
            <Route path="/"  element={<Home />} />
            <Route path="/myfpl" element={<MyFPL />} />
            <Route path="/draft" element={<Draft />}/>
        </Routes>
    )
}