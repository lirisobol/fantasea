import { PositionFilter } from "./PositionFilter"
import { SearchFilter } from "./SearchFilter"
import { TeamFilter } from "./TeamFilter"

export const PlayersTableFilterGroup = ():JSX.Element => {
    return (
        <div className="p-1 flex gap-1 justify-center">
            <SearchFilter />
            <TeamFilter />
            <PositionFilter />
        </div>
    )
}