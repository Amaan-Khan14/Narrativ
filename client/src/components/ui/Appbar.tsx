import { Link } from "react-router-dom"

export const AppBar = ({ }) => {
    return (
        <nav className="sm:block hidden bg-zinc-800/70 backdrop-blur-md shadow-lg p-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/blogs">
                            <span className="text-stone-100 text-2xl font-bold tracking-wider">Narrativ</span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-baseline space-x-4">
                            <a href="/blogs" className="text-stone-300 hover:bg-zinc-700/50 hover:text-white hover:font-semibold px-3 py-2 rounded-md text-lg font-normal tracking-wide transition duration-300">Home</a>
                            <a href="/about" className="text-stone-300 hover:bg-zinc-700/50 hover:text-white hover:font-semibold px-3 py-2 rounded-md text-lg font-normal tracking-wide transition duration-300">About</a>
                            <a href="/create" className="text-stone-300 hover:bg-zinc-700/50 hover:text-white hover:font-semibold px-3 py-2 rounded-md text-lg font-normal tracking-wide transition duration-300">Create</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}