import { Blog } from "@/hooks";
import { parseISO } from "date-fns";
import { format } from "date-fns/format";
import { Avatar, AvatarFallback } from "./avatar";
import { Card } from "./card";

export const FullBlog = ({ blog }: { blog: Blog }) => {
    const formatDate = (date: Date | string | null | undefined) => {
        if (!date) return 'No date';
        try {
            const dateObj = typeof date === 'string' ? parseISO(date) : date;
            return format(dateObj, 'MMM d, yyyy');
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid date';
        }
    };

    return (
        <div className="sm:mx-16 sm:mb-16 grid grid-cols-1 2xl:grid-cols-10 2xl:gap-4">
            <div className="col-span-full 2xl:col-span-8 md:mx-10 m-2">
                <div className="w-full mt-8">
                    <h1 className="md:text-4xl text-2xl font-bold text-stone-300 mb-5 break-words">{blog.title}</h1>
                    <div className="flex items-center mb-2 2xl:hidden">
                        <Avatar className="bg-stone-800 h-8 mr-2 w-8 font-semibold sm:block hidden ">
                            <AvatarFallback className="text-transparent bg-clip-text text-xl">
                                {blog.author.username[0]}
                            </AvatarFallback>
                        </Avatar>
                        <span className="sm:text-2xl text-xs break-words font-semibold text-stone-400">{blog.author.username}</span>
                    </div>
                    <div className="sm:text-lg text-sm text-stone-50 font-thin break-words">{blog.content}</div>
                </div>
            </div>
            <div className="col-span-full 2xl:col-span-2 md:mx-10 mt-8 2xl:block hidden">
                <Card className="rounded-2xl w-full bg-inherit mb-5 shadow-2xl [box-shadow:0_-20px_80px_-20px_rgba(0,0,0,0.15)_inset] border-2 border-white/5 font-geistSans hover:bg-transparent/10 hover:border-zinc-600">
                    <div className="font-thin text-stone-400 m-5">
                        <div className="flex items-center mb-2">
                            <Avatar className="bg-stone-800 h-8 mr-2 w-8 font-semibold">
                                <AvatarFallback className="text-transparent bg-clip-text text-xl">
                                    {blog.author.username[0]}
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-2xl font-semibold">{blog.author.username}</span>
                        </div>
                        <div className="ml-1 mt-4 font-normal tracking-wide">Published on: <i>{formatDate(blog.createdAt)}</i></div>
                    </div>
                </Card>
            </div>
        </div>
    )
}