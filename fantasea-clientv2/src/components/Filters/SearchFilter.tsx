import { ChangeEvent } from "react";
import { useAppDispatch } from "../../store/store";
import { setSearchQuery } from "../../store/slices/filters";


export function SearchFilter(): JSX.Element {
    const dispatch = useAppDispatch();
    
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        dispatch(setSearchQuery(query));
    };
    return (
        <input
            type="text"
            placeholder="Search players..."
            onChange={handleSearchChange}
            className="input input-bordered w-full max-w-xs"
        />
    );
}
