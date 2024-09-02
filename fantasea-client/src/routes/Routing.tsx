import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Research } from "../pages/Research/Research";

export function Routing():JSX.Element {
    return(
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/research" element={<Research />} />
            </Routes>
        </>
    )
}