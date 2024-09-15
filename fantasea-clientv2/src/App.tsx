import { useEffect } from "react";
import { Routing } from "./router/Routing";
import { fetchGeneralInfo } from "./store/slices/gen-info";
import { useAppDispatch, useAppSelector } from "./store/store";
import Navbar from "./components/Navbar/Navbar";
import LoaderBar from "./components/Loading/LoaderBar/LoaderBar";
import { hideAlert } from "./store/slices/alert";
import { Alert } from "./components/Alerts/Alert";

function App() {
    const dispatch = useAppDispatch();
    const {status, error} = useAppSelector(state => state.genInfo)
    const alert = useAppSelector((state) => state.alert);

    useEffect(() => {
        dispatch(fetchGeneralInfo());
    }, [])
    
    if(error) return <div>Error: {error}</div>
    return (
        
        <div className="flex flex-col h-screen"> {/* Ensure the app fills the entire screen */}

            <nav className="h-7vh"> {/* Navbar */}
                <Navbar />
            </nav>
            <main className="flex-1 overflow-hidden"> {/* Content area now prevents overflow */}

                {status === 'loading' && <LoaderBar />}
                <div className="h-93vh overflow-y-auto"> {/* This div now correctly manages overflow */}
                    {alert.isVisible && (
                        <Alert
                            message={alert.message}
                            type={alert.type}
                            onClose={() => dispatch(hideAlert())}
                        />
                    )}
                    <Routing />
                </div>
            </main>
        </div>
    )
}

export default App;
