import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { Card, CardDescription, CardTitle } from './card';

interface ProfileCardProps {
    title: string;
    createdAt: Date;
    id: number;
    description?: string;
}

export const ProfileCard = ({ id, title, description, createdAt }: ProfileCardProps) => {
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
                        <div className='sm:block hidden text-stone-400 pb-2'>
                            Published on :<i>{"  " + formatDate(createdAt)}</i>
                        </div>
                        <CardTitle className="sm:text-3xl text-sm pb-2 font-bold text-stone-300 break-words">
                            {title}
                        </CardTitle>
                        <CardDescription className="text-lg text-stone-50 font-thin sm:block hidden">
                            {description?.slice(0, 100) + '...'}
                        </CardDescription>
                    </div>
                </Card>
            </Link>
        </div>
    );
}