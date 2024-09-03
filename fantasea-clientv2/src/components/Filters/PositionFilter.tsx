import { setPositionType } from "../../store/slices/filters";
import { useAppDispatch, useAppSelector } from "../../store/store";

export function PositionFilter(): JSX.Element {
    const dispatch = useAppDispatch();
    const positionType = useAppSelector((state) => state.filters.positionType);

    const handlePositionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const positionType = Number(event.target.value);
        console.log(positionType);
        dispatch(setPositionType(positionType));
    };
    return (
        <select value={positionType} onChange={handlePositionTypeChange} className="select select-bordered w-full max-w-xs">
            <option
                key='all-positions'
                value='0'
                id='all-positions'
            >
                Position
            </option>
            <option
                key='goalkeepers'
                value='1'
                id='goalkeepers'
            >
                Goalkeepers
            </option>
            <option
                key='defenders'
                value='2'
                id='defenders'
            >
                Defenders
            </option>
            <option
                key='midfielders'
                value='3'
                id='midfielders'
            >
                Midfielders
            </option>
            <option
                key='attackers'
                value='4'
                id='attackers'
            >
                Attackers
            </option>
        </select>
    )
}