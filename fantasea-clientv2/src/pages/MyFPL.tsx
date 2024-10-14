import { useState } from "react";
import { ManagerSearch } from "../components/MyFPL/Manager/ManagerSearch"
import { ManagerDetails } from "../models/ManagerDetails";
import { myFPLTrackerService } from "../services/data/MyFPLTracker";
import ErrorBanner from "../components/Banners/ErrorBanner";
import { LoadingSpinner } from "../components/Loading/LoadingSpinner/LoadingSpinner";
import { ManagerStats } from "../components/MyFPL/Manager/ManagerDetails";

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
        <div className="w-full h-full flex flex-col gap-2">
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
                <div className="flex justify-center">
                    <ManagerStats managerStats={managerDetails}/>
                </div>
            )}
        </div>
    )
}

/* 
<FontAwesomeIcon icon={faCaretUp} style={{color:"#63E6BE", marginRight:"10px"}} size="lg"/>
<FontAwesomeIcon icon={faCaretDown} style={{color:"#e66565", marginRight:"10px"}} size="lg"/>
*/