import ThemeToggle from "./components/shared/ThemeToggle/ThemeToggle";

function App() {
    return (
        <div className="flex flex-col h-screen">
            <nav className="bg-blue-500 text-white h-7vh"> {/* Navbar */}
                <div className="navbar">
                    <ThemeToggle />
                  <a className="btn btn-ghost normal-case text-xl">Logo</a>
                </div>
            </nav>
            <main className="flex-1 overflow-y-auto"> {/* Content area */}
                {/* Content goes here */}
            </main>
        </div>
    )
}

export default App;
