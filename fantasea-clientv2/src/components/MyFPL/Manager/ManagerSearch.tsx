import { useState } from "react"

export const ManagerSearch = ():JSX.Element => {
    const [managerId, setManagerId] = useState('')
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(managerId.trim() === '') {
            alert('Please Enter Manager ID');
            return
        }
        console.log('Manager ID submitted:', managerId);

    }
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
                >
                    Find Manager
                </button>
            </form>
        </div>
    )
}