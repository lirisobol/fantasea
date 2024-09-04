import { useEffect } from "react";
import { Routing } from "./router/Routing";
import { fetchGeneralInfo } from "./store/slices/gen-info";
import { useAppDispatch, useAppSelector } from "./store/store";
import { LoadingSpinner } from "./components/LoadingSpinner/LoadingSpinner";
import Navbar from "./components/Navbar/Navbar";

function App() {
    const dispatch = useAppDispatch();
    const {status, error} = useAppSelector(state => state.genInfo)

    useEffect(() => {
        dispatch(fetchGeneralInfo());
    }, [])
    
    if(error) return <div>Error: {error}</div>
    return (
        <div className="flex flex-col h-screen">
            <nav className="h-7vh"> {/* Navbar */}
                <Navbar />
            </nav>
            <main className="flex-1 overflow-y-auto"> {/* Content area */}
                {status === 'loading' && <LoadingSpinner />}
                <div className="mt-3">
                    <Routing />
                </div>
            </main>
        </div>
    )
}

export default App;
