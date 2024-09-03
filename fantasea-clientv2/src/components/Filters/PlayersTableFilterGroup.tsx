import { PositionFilter } from "./PositionFilter"
import { SearchFilter } from "./SearchFilter"
import { TeamFilter } from "./TeamFilter"

export const PlayersTableFilterGroup = ():JSX.Element => {
    return (
        <div className="fixed top-[64px] z-10 w-full bg-white shadow p-1 flex gap-1 justify-center">
            <SearchFilter />
            <TeamFilter />
            <PositionFilter />
        </div>
    )
} 