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
        <div className="mx-16 grid grid-cols-1 2xl:grid-cols-10 2xl:gap-4">
            <div className="col-span-full 2xl:col-span-8 md:mx-10 m-2">
                <div className="w-full mt-8">
                    <div className="mb-5">
                        <div className="text-4xl font-bold text-stone-300 break-words pr-4">{blog.title}</div>
                    </div>
                    <div className="flex mb-2 2xl:hidden">
                        <Avatar className="bg-stone-800 h-8 mr-2 w-8 font-semibold ">
                            <AvatarFallback className="text-transparent bg-clip-text text-xl">
                                {blog.author.username[0]}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-2xl break-words font-semibold text-stone-400">{blog.author.username}</span>
                    </div>
                    <div className="my-2 font-thin text-stone-300 tracking-wide 2xl:hidden block">Published on: <i>{formatDate(blog.createdAt)}</i></div>
                    <div
                        className="text-lg text-stone-50 break-words prose prose-invert max-w-none"
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