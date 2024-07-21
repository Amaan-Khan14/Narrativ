import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"

interface AppBarProps {
    authorName: string;
}

export const AppBar = ({ authorName }: AppBarProps) => {
    return (
        <nav className="bg-zinc-800 shadow-lg p-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-stone-100 text-xl font-bold">Narrativ</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a href="#" className="text-stone-300 hover:bg-zinc-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                                <a href="#" className="text-stone-300 hover:bg-zinc-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Blog</a>
                                <a href="#" className="text-stone-300 hover:bg-zinc-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
                                <a href="#" className="text-stone-300 hover:bg-zinc-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    )
}