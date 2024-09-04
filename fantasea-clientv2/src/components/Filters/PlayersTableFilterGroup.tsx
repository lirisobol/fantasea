import { PositionFilter } from "./PositionFilter"
import { PriceRangeFilter } from "./PriceRangeFilter"
import { SearchFilter } from "./SearchFilter"
import { TeamFilter } from "./TeamFilter"

export const PlayersTableFilterGroup = ():JSX.Element => {
    return (
        <div className="w-full bg-white shadow p-1 flex gap-5 justify-center">
            <SearchFilter />
            <TeamFilter />
            <PositionFilter />
            <PriceRangeFilter />
        </div>
    )
} 