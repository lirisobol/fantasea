import { useState } from "react";

interface ManagerSearchProps { 
    onSubmit: (managerId: string) => void;
    loading: boolean;
}

export const ManagerSearch = ({onSubmit, loading}: ManagerSearchProps): JSX.Element => {
    const [managerId, setManagerId] = useState('');
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (managerId.trim() === '') {
            alert('Please enter a Manager ID');
            return;
        }

        const id = parseInt(managerId.trim());
        if (isNaN(id)) {
            alert('Manager ID must be a number');
            return;
        }
        onSubmit(managerId.trim());
    };
  
    return (
    <div>
        <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-row gap-2 items-center">
            <label htmlFor="manager-search" className="sr-only">
              Manager ID
            </label>
            <input
              id="manager-search"
              name="manager-search"
              type="text"
              placeholder="Manager ID"
              className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm"
              value={managerId}
              onChange={(e) => setManagerId(e.target.value)}
            />
            <button
              type="submit"
              className="block w-full border px-4 py-1.5 rounded-md bg-gray-900 text-white hover:bg-white hover:text-gray-900 hover:border hover:border-gray-900 transition"
              disabled={loading}

            >
                Search
            </button>
        </form>
    </div>
  );
};
