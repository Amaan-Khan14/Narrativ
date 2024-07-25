import { Blog } from "@/hooks";
import { parseISO, format } from "date-fns";
import { Avatar, AvatarFallback } from "./avatar";
import { Card } from "./card";
import DOMPurify from 'dompurify';
import { TrashIcon } from "lucide-react";
import axios from "axios";
import { APP_URL } from "@/config";
import { useNavigate } from "react-router-dom";
import { toast } from "./use-toast";
import { useState } from "react";
import { Button } from "./button";
import { ReloadIcon } from "@radix-ui/react-icons";

export const FullBlog = ({ blog }: { blog: Blog }) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);

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

    const sanitizeHtml = (html: string) => {
        return DOMPurify.sanitize(html);
    };

    return (
        <div className="sm:mx-16 grid grid-cols-1 2xl:grid-cols-10 2xl:gap-4">
            <div className="col-span-full 2xl:col-span-8 md:mx-10 m-2">
                <div className="w-full mt-8">
                    <div className="flex items-center justify-between mb-5">
                        <div className="md:text-4xl text-base font-bold text-stone-300 break-words pr-4">{blog.title}</div>
                        <Button
                            className="w-full sm:w-auto sm:block hidden text-lg sm:text-xl relative text-zinc-100 bg-stone-800 border-stone-800/30 text-md font-geistSans hover:border-zinc-600 hover:bg-transparent/20 hover:shadow-inner hover:text-zinc-950  items-center justify-center"
                            onClick={async () => {
                                setIsLoading(true);
                                try {
                                    await axios.delete(`${APP_URL}/blog/${blog.id}`, {
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
                    </div>
                    <div className="flex items-center mb-2 2xl:hidden">
                        <Avatar className="bg-stone-800 h-8 mr-2 w-8 font-semibold sm:block hidden ">
                            <AvatarFallback className="text-transparent bg-clip-text text-xl">
                                {blog.author.username[0]}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-2xl sm:block hidden break-words font-semibold text-stone-400">{blog.author.username}</span>
                    </div>
                    <div
                        className="sm:text-lg text-sm text-stone-50 font-thin break-words prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.content) }}
                    />
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