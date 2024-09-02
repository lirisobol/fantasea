import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Clubs } from "../pages/Clubs"
import { Players } from "../pages/Players"
import { Managers } from "../pages/Managers"
import { Leagues } from "../pages/Leagues"
import { Compare } from "../pages/Compare"

export const Routing = ():JSX.Element => {
    return (
        <Routes>
            <Route path="/"  element={<Home />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/players" element={<Players />} />
            <Route path="/managers" element={<Managers />} />
            <Route path="/leagues" element={<Leagues />} />
            <Route path="/compare" element={<Compare />} />
        </Routes>
    )
}