import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { Card, CardDescription, CardTitle } from './card';
import { Avatar, AvatarFallback } from './avatar';

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    createdAt: Date;
    id: number;
    description?: string;
}

export const BlogCard = ({ id, authorName, title, description, createdAt,content }: BlogCardProps) => {
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
                <Card className="cursor-pointer rounded-2xl bg-inherit mb-5 shadow-2xl [box-shadow:0_-20px_80px_-20px_rgba(0,0,0,0.15)_inset] border-2 border-white/5 font-geistSans hover:bg-transparent/10 hover:border-zinc-600">
                    <div className="m-5">
                        <div className="flex sm:flex-row flex-col font-thin mb-3 text-stone-400">
                            <Avatar className="bg-stone-800 h-10 w-10 sm:h-6 mr-2 sm:w-6 font-semibold">
                                <AvatarFallback className="text-transparent bg-clip-text text-xl sm:text-xs">
                                    {authorName[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                {authorName} • {formatDate(createdAt)}
                            </div>
                        </div>
                        <CardTitle className="sm:text-3xl text-xl break-words font-bold text-stone-300">
                            {title}
                        </CardTitle>
                        <CardDescription className="text-lg text-stone-50 font-thin ">
                            {description?.slice(0, 100) + '...'}
                            <div className="text-sm text-white/40 mt-10 mb-7 sm:block hidden">{Math.ceil(content.length / 100)}min(s) read</div>
                        </CardDescription>
                    </div>
                </Card>
            </Link>
        </div>
    );
}