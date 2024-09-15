import { TeamDrawerBench } from "./TeamDrawerBench"
import { TeamDrawerSquad } from "./TeamDrawerSquad"

export const TeamDrawerBenchAndSquad = (): JSX.Element => {
    return (
        <>
            <div className="p-3 mt-2 font-bold border-b">Squad</div>
            <TeamDrawerSquad />
            <div className="p-3 mt-2 font-bold border-b">Bench</div>
            <TeamDrawerBench />
        </>        
    )
}