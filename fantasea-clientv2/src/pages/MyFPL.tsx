import { useState } from "react";
import { ManagerSearch } from "../components/MyFPL/Manager/ManagerSearch"
import { ManagerDetails } from "../models/manager/ManagerDetails";
import { myFPLTrackerService } from "../services/data/MyFPLTracker";
import ErrorBanner from "../components/Banners/ErrorBanner";
import { LoadingSpinner } from "../components/Loading/LoadingSpinner/LoadingSpinner";
import { ManagerStats } from "../components/MyFPL/Manager/ManagerDetails";
import { ManagerCharts } from "../components/MyFPL/Manager/ManagerCharts";

export const MyFPL = ():JSX.Element => {
    const [managerDetails, setManagerDetails] = useState<ManagerDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const handleManagerSearch = async (managerId: string) => {
        setLoading(true);
        setError('');
        setManagerDetails(null);
        const id = parseInt(managerId);
        try {
            const managerDetailsData = await myFPLTrackerService.fetchManagerDetails(id);
            setManagerDetails(managerDetailsData);
        }
        catch (err) {
            console.error('Error Fetching Data', err);
            setError('Failed to fetch manager details');
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div className="w-full h-full flex flex-col items-center gap-2">
            {error && (
                <ErrorBanner message={error}/>
            )}
            <div className="flex justify-center py-10">
                <ManagerSearch onSubmit={handleManagerSearch} loading={loading}/>
            </div>
            {loading && (
                <LoadingSpinner />
            )}
            {managerDetails && (
                <div className="flex flex-col items-center border rounded-lg w-full shadow">
                    <div className="border w-full">
                        <ManagerStats managerDetails={managerDetails}/>
                    </div>
                    <div className="border w-full">
                        <ManagerStats managerDetails={managerDetails}/>
                    </div>
                    <div className="border w-full">
                        <ManagerCharts managerDetails={managerDetails}/>
                    </div>
                </div>
            )}
        </div>
    )
}
