import { Card, CardDescription, CardTitle } from "./card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({ authorName, title, content, publishedDate }: BlogCardProps) => {
    return (
        <div>
            <Card className="sm:visible invisible rounded-2xl bg-inherit md:visible mb-5 shadow-2xl [box-shadow:0_-20px_80px_-20px_rgba(0,0,0,0.15)_inset] border-2 border-white/5 font-geistSans hover:bg-transparent/10 hover:border-zinc-600">
                <div className="m-5">
                    <div className="flex font-thin mb-3 text-stone-400">
                        <Avatar className="bg-stone-800 h-6 mr-2 w-6 font-semibold">
                            <AvatarFallback className="text-transparent bg-clip-text text-xs">
                                {authorName[0]}
                            </AvatarFallback>
                        </Avatar>
                        {authorName} {publishedDate}
                    </div>
                    <CardTitle className="text-3xl font-bold text-stone-300">
                        {title}
                    </CardTitle>
                    <CardDescription className="text-lg text-stone-50 font-thin">{content.slice(0, 100) + "..."}</CardDescription>
                    <div className="text-sm text-white/40 mt-10 mb-7 ">{Math.ceil(content.length / 100)}min(s) read</div>
                </div>
            </Card>
        </div>
    )
}