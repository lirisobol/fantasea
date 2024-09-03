import { setTeam } from "../../store/slices/filters";
import { useAppDispatch, useAppSelector } from "../../store/store";

export function TeamFilter():JSX.Element {
    const dispatch = useAppDispatch();
    const teamCode = useAppSelector((state) => state.filters.teamCode);
    const teams = useAppSelector((state) => state.genInfo.data?.teams);

    const handleTeamChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTeamCode = parseInt(event.target.value, 10);
        dispatch(setTeam(selectedTeamCode));
    }
    return (
        <select value={teamCode} onChange={handleTeamChange} className="select select-bordered w-full max-w-xs">
            <option key='all-teams' value="0">Clubs</option>
            {teams && teams.map(team => (
                <option key={team.code} value={team.code}>
                    {team.name}
                </option>
            ))}
        </select>
    )
}