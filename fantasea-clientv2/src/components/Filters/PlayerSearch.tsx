import { ChangeEvent } from "react";
import { useAppDispatch } from "../../store/store"
import { setSearchQuery } from "../../store/slices/filters";

export default function PlayerSearch() {
    const dispatch = useAppDispatch();
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        dispatch(setSearchQuery(query));
    }
    return (
      <div>
        <div className="mt-2">
          <input
            id="player-search"
            name="player-search"
            type="text"
            placeholder="Search Players"
            onChange={handleSearchChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    )
  }
  