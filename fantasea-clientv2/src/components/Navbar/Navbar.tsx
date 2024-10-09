import { NavLink } from "react-router-dom"

export const Navbar = ():JSX.Element => {
    return (
        <div className="border py-3 px-10 shadow flex flex-row justify-between items-center gap-4">
            {/* Brand */}
            <div>
                <NavLink to={"/"} className={"font-bold text-lg"}>
                    Brand
                </NavLink>
            </div>
            {/* Links */}
            <div>
                <NavLink to={"/draft"} className={"px-14 py-1 rounded-lg border border-gray-900 hover:bg-gray-900 hover:text-white transition"}>
                    Draft
                </NavLink>
            </div>
        </div>
    )
}