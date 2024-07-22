import { Blog } from "@/hooks";
import { parseISO } from "date-fns";
import { format } from "date-fns/format";
import { Avatar, AvatarFallback } from "./avatar";

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
        <div className="flex justify-center">
            <div className="w-1/2 mt-8">
                <h1 className="text-4xl font-bold text-stone-300 mb-5">{blog.title}</h1>
                <div className="flex font-thin mb-3 text-stone-400">
                    <Avatar className="h-6 mr-2 w-6 ">
                        <AvatarFallback className="bg-stone-800 font-semibold">{blog.author.username[0]}</AvatarFallback>
                    </Avatar>
                    {blog.author.username} • {formatDate(blog.createdAt)}
                </div>
                <div className="text-lg text-stone-50 font-thin">{blog.content}</div>
            </div>
        </div>
    )
}