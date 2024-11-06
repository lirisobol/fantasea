import { useAppSelector } from "../../../../store/store"

export const BenchCounter = ():JSX.Element => {
    const squad = useAppSelector((state) => state.draft.squad)
    const numberOfPicks = squad.filter((slot) => slot.isPicked && !slot.isStarter).length

    return (
        <div className="border shadow-sm rounded-md flex flex-row gap-2">
            <span className="bg-pink-500 text-white rounded-l-md px-4 py-1">Bench</span>
            <span className="bg-white rounded-r-md px-4 py-1"><span className="font-bold">{numberOfPicks}</span> / 4</span>
        </div>
    )
}