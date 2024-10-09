import { ManagerSearch } from "../components/MyFPL/Manager/ManagerSearch"

export const MyFPL = ():JSX.Element => {

    return (
        <div className="w-full h-full flex flex-col items-center gap-2 p-2">
            <ManagerSearch />
        </div>
    )
}