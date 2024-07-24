import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import { Card, CardDescription, CardTitle } from './card';
import { Avatar, AvatarFallback } from './avatar';

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    createdAt: Date;
    id: number;
}

export const BlogCard = ({ id, authorName, title, content, createdAt }: BlogCardProps) => {
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
        <div>
            <Link to={`/blog/${id}`}>
                <Card className="cursor-pointer rounded-2xl bg-inherit md:visible mb-5 shadow-2xl [box-shadow:0_-20px_80px_-20px_rgba(0,0,0,0.15)_inset] border-2 border-white/5 font-geistSans hover:bg-transparent/10 hover:border-zinc-600">
                    <div className="m-5">
                        <div className="flex font-thin mb-3 text-stone-400">
                            <Avatar className="bg-stone-800 h-6 mr-2 w-6 font-semibold">
                                <AvatarFallback className="text-transparent bg-clip-text text-xs">
                                    {authorName[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className='sm:block hidden'>
                                {authorName} • {formatDate(createdAt)}
                            </div>
                        </div>
                        <CardTitle className="sm:text-3xl text-sm font-bold text-stone-300 break-words">
                            {title}
                        </CardTitle>
                        <CardDescription className="text-lg text-stone-50 font-thin sm:block hidden">{content.slice(0, 100) + "..."}</CardDescription>
                        <div className="text-sm text-white/40 mt-10 mb-7 sm:block hidden">{Math.ceil(content.length / 100)}min(s) read</div>
                    </div>
                </Card>
            </Link>
        </div>
    )
}