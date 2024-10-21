import { NavLink } from "react-router-dom"

export const Navbar = ():JSX.Element => {
    return (
        <div className="border py-3 px-5 shadow flex flex-row justify-between items-center gap-4 text-xs sm:text-sm">
            {/* Brand */}
            <div>
                <NavLink to={"/"} className={"font-bold text-lg"}>
                    Fantasea
                </NavLink>
            </div>
            <div className="flex gap-2">
                <NavLink to={"/myfpl"} className={"px-4 py-1.5 rounded-lg border border-gray-900 hover:bg-gray-900 hover:text-white transition"}>
                    My Fantasy
                </NavLink>
                <NavLink to={"/draft"} className={"px-4 py-1.5 rounded-lg border border-gray-900 hover:bg-gray-900 hover:text-white transition"}>
                    Draft
                </NavLink>
            </div>
            {/* Links */}
        </div>
    )
}