import Navbar from "./components/Navbar/Navbar";

function App() {
    return (
        <div className="flex flex-col h-screen">
            <nav className="h-7vh"> {/* Navbar */}
                <Navbar />
            </nav>
            <main className="flex-1 overflow-y-auto"> {/* Content area */}
                {/* Content goes here */}
            </main>
        </div>
    )
}

export default App;
