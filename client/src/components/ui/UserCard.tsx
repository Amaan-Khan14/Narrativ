
import { Card, CardHeader, CardTitle } from './card';
import { Avatar, AvatarFallback } from './avatar';

interface UserCardProps {
    username: string
    email: string
}

export const UserCard = ({ username, email, }: UserCardProps) => {
    return (
        <div>
            <Card className=" sm:block hidden rounded-2xl bg-inherit mb-5 shadow-2xl [box-shadow:0_-20px_80px_-20px_rgba(0,0,0,0.15)_inset] border-2 border-white/5 font-geistSans hover:bg-transparent/10 hover:border-zinc-600">
                <CardHeader className="flex flex-col sm:flex-row items-center m-3 sm:m-5 font-thin text-stone-400">
                    <Avatar className="bg-stone-800 h-10 w-10 mb-2 sm:mb-0 sm:mr-2 font-semibold">
                        <AvatarFallback className="text-transparent  bg-clip-text text-xl">
                            {username[0]}
                        </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-center sm:text-left">
                        <div className='flex flex-col flex-shrink-0'>
                            <div className='text-base sm:text-2xl break-words'>
                                {username}
                            </div>
                            <div className='text-sm sm:text-2xl'>
                                {email}
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>
            </Card>
            <Card className="rounded-2xl p-2 sm:hidden block bg-inherit shadow-2xl [box-shadow:0_-20px_80px_-20px_rgba(0,0,0,0.15)_inset] border-2 border-white/5 font-geistSans hover:bg-transparent/10 hover:border-zinc-600">
                <div className="flex flex-col sm:flex-row items-center my-2">
                    <Avatar className="bg-stone-800 h-6 mr-2 w-6 font-semibold ">
                        <AvatarFallback className="text-transparent bg-clip-text text-sm text-stone-300">
                            {username[0]}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-xs break-words font-semibold text-stone-400">{username}</span>
                </div>
            </Card>
            <div className='flex justify-center text-2xl font-semibold m-5 text-stone-400'>
                Blogs Published
            </div>
        </div>
    );
}