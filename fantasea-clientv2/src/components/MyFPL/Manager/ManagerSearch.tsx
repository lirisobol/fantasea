import { useState } from "react";
import { myFPLTrackerService } from "../../../services/data/MyFPLTracker";

export const ManagerSearch = (): JSX.Element => {
  const [managerId, setManagerId] = useState('');
  const [managerDetails, setManagerDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

    setLoading(true);
    setError('');

    try {
        const managerDetailsData = await myFPLTrackerService.fetchManagerDetails(id);
        setManagerDetails(managerDetailsData);
    } catch (err) {
      console.error('Error fetching manager details:', err);
      setError('Failed to fetch manager details. Please try again.');
    } finally {
      setLoading(false);
    }
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
              placeholder="Enter Your Manager ID"
              className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm"
              value={managerId}
              onChange={(e) => setManagerId(e.target.value)}
            />
            <button
              type="submit"
              className="block w-full border px-4 py-1.5 rounded-md bg-gray-900 text-white hover:bg-white hover:text-gray-900 hover:border hover:border-gray-900 transition"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Find Manager'}
            </button>
        </form>

        {error && (
            <div className="mt-2 text-red-500">
              {error}
            </div>
      )}
    </div>
  );
};
