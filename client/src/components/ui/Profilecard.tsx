import { format, parseISO } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardDescription, CardTitle } from './card';
import { toast } from './use-toast';
import axios from 'axios';
import { APP_URL } from '@/config';
import { Button } from './button';
import { useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { TrashIcon } from 'lucide-react';

interface ProfileCardProps {
    title: string;
    createdAt: Date;
    id: number;
    description?: string;
}

export const ProfileCard = ({ id, title, description, createdAt }: ProfileCardProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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
            <Card className="rounded-2xl cursor-pointer bg-inherit mb-5 shadow-2xl [box-shadow:0_-20px_80px_-20px_rgba(0,0,0,0.15)_inset] border-2 border-white/5 font-geistSans hover:bg-transparent/10 hover:border-zinc-600">
                <div className="m-5">
                    <div className='break-words text-stone-400 pb-2'>
                        Published on :<i>{"  " + formatDate(createdAt)}</i>
                    </div>
                    <CardTitle className="sm:text-3xl flex items-end justify-between text-2xl pb-2 font-bold text-stone-300 break-words">
                        <div>
                            {title}
                        </div>
                        <Button
                            className="w-1/12 sm:w-auto text-lg sm:text-xl relative text-zinc-100 bg-stone-800 border-stone-800/30 text-md font-geistSans hover:border-zinc-600 hover:bg-transparent/20 hover:shadow-inner hover:text-zinc-950  items-center justify-center"
                            onClick={async () => {
                                setIsLoading(true);
                                try {
                                    await axios.delete(`${APP_URL}/blog/${id}`, {
                                        headers: {
                                            Authorization: localStorage.getItem("token")
                                        }
                                    });
                                    toast({
                                        title: "Success",
                                        description: "Blog deleted successfully",
                                        variant: "destructive",
                                        duration: 5000
                                    })
                                    navigate("/blogs");
                                } catch (error) {
                                    toast({
                                        title: "Error",
                                        description: "You are not authorized to delete this blog",
                                        variant: "destructive",
                                        duration: 5000
                                    })
                                } finally {
                                    setIsLoading(false);
                                }
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? <ReloadIcon className="animate-spin" /> : <TrashIcon
                                className="h-6 w-6 text-stone-400 cursor-pointer flex-shrink-0"
                            />}
                        </Button>
                    </CardTitle>
                    <CardDescription className="text-lg text-stone-50 font-thin sm:block hidden">
                        {description?.slice(0, 100) + '...'}
                    </CardDescription>
                </div>
            </Card>
        </div>
    );
}