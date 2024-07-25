import { Link } from 'react-router-dom';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"


export const AppBar = () => {

    return (
        <nav className=" bg-zinc-800/70 backdrop-blur-md shadow-lg p-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/blogs">
                            <span className="text-stone-100 text-2xl font-bold tracking-wider">Narrativ</span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-baseline space-x-4">
                            <Link to="/blogs" className="text-stone-300 hover:bg-zinc-700/50 hover:text-white hover:font-semibold px-3 py-2 rounded-md text-lg font-normal tracking-wide transition duration-300">Home</Link>
                            <Link to="/publish" className="text-stone-300 hover:bg-zinc-700/50 hover:text-white hover:font-semibold px-3 py-2 rounded-md text-lg font-normal tracking-wide transition duration-300">Publish</Link>
                            <Link to="/profile" className="text-stone-300 hover:bg-zinc-700/50 hover:text-white hover:font-semibold px-3 py-2 rounded-md text-lg font-normal tracking-wide transition duration-300">Profile</Link>
                        </div>
                    </div>
                    <Menubar className="md:hidden flex bg-inherit text-stone-300 border-white/5">
                        <MenubarMenu>
                            <MenubarTrigger className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" height="30" viewBox="0 0 50 50">
                                <path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"></path>
                            </svg></MenubarTrigger>
                            <MenubarContent className="bg-stone-400">
                                <MenubarItem>
                                    <Link to="/blogs" className="w-full font-bold text-base">Home</Link>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>
                                    <Link to="/publish" className="w-full font-bold text-base">Publish</Link>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>
                                    <Link to="/profile" className="w-full font-bold text-base">Profile</Link>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>

                </div>
            </div>
        </nav>
    );
};

