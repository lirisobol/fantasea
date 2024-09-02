import Navbar from "./components/Navbar/Navbar";
import { Routing } from "./router/Routing";

function App() {
    return (
        <div className="flex flex-col h-screen">
            <nav className="h-7vh"> {/* Navbar */}
                <Navbar />
            </nav>
            <main className="flex-1 overflow-y-auto"> {/* Content area */}
                <div>
                    <Routing />
                </div>
            </main>
        </div>
    )
}

export default App;
